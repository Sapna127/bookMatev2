const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
// const { expect } = require('chai');
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('../../routes/bookRoutes');
const Book = require('../../models/Book');

const app = express();
app.use(bodyParser.json());
app.use('/books', bookRoutes);

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Book.deleteMany({});
});

describe('Book Routes', () => {
  describe('POST /books', () => {
    it('should add a new book', async () => {
      const res = await request(app)
        .post('/books')
        .send({
          name: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          publication: 'Charles Scribner\'s Sons',
          tags: ['classic', 'novel'],
          description: 'A novel set in the Roaring Twenties.',
          pictures: ['http://example.com/great-gatsby.jpg'],
          sellerId: new mongoose.Types.ObjectId().toString(),
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.include({
        name: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        publication: 'Charles Scribner\'s Sons',
      });
      expect(res.body).to.have.property('tags').with.lengthOf(2);
    });

    it('should return 400 for invalid book data', async () => {
      const res = await request(app)
        .post('/books')
        .send({ name: '', author: '' });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message');
    });
  });

  describe('GET /books', () => {
    it('should return all books', async () => {
      await Book.create([
        { name: 'Book 1', author: 'Author 1', publication: 'Pub 1', description: 'Desc 1', sellerId: new mongoose.Types.ObjectId().toString() },
        { name: 'Book 2', author: 'Author 2', publication: 'Pub 2', description: 'Desc 2', sellerId: new mongoose.Types.ObjectId().toString() },
      ]);

      const res = await request(app).get('/books');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array').with.lengthOf(2);
    });
  });

  describe('GET /books/:id', () => {
    it('should return a book by ID', async () => {
      const book = await Book.create({ name: 'Book 1', author: 'Author 1', publication: 'Pub 1', description: 'Desc 1', sellerId: new mongoose.Types.ObjectId().toString() });
      const res = await request(app).get(`/books/${book._id}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.include({ name: 'Book 1', author: 'Author 1' });
    });

    it('should return 404 if book not found', async () => {
      const res = await request(app).get('/books/invalidid');

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message', 'Book not found');
    });
  });

  describe('PUT /books/:id', () => {
    it('should update a book by ID', async () => {
      const book = await Book.create({ name: 'Book 1', author: 'Author 1', publication: 'Pub 1', description: 'Desc 1', sellerId: new mongoose.Types.ObjectId().toString() });
      const res = await request(app)
        .put(`/books/${book._id}`)
        .send({ name: 'Updated Book 1' });

      expect(res.status).to.equal(200);
      expect(res.body).to.include({ name: 'Updated Book 1', author: 'Author 1' });
    });

    it('should return 404 if book to update is not found', async () => {
      const res = await request(app).put('/books/invalidid').send({ name: 'Updated Book' });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message', 'Book not found');
    });
  });

  describe('DELETE /books/:id', () => {
    it('should delete a book by ID', async () => {
      const book = await Book.create({ name: 'Book 1', author: 'Author 1', publication: 'Pub 1', description: 'Desc 1', sellerId: new mongoose.Types.ObjectId().toString() });
      const res = await request(app).delete(`/books/${book._id}`);

      expect(res.status).to.equal(204);
    });

    it('should return 404 if book to delete is not found', async () => {
      const res = await request(app).delete('/books/invalidid');

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message', 'Book not found');
    });
  });
});
