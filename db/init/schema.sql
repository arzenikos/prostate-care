CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS documents (
  id           serial PRIMARY KEY,
  source       text UNIQUE NOT NULL,
  content_hash text,
  created_at   timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chunks (
  id          bigserial PRIMARY KEY,
  document_id int NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index int NOT NULL,
  page        int,
  content     text NOT NULL,
  embedding   vector(768) NOT NULL,   -- must match EMBEDDING_DIMENSIONS
  UNIQUE (document_id, chunk_index)
);

CREATE INDEX IF NOT EXISTS chunks_embedding_idx
  ON chunks USING hnsw (embedding vector_cosine_ops);

-- Existing tables from before:
-- ALTER TABLE documents RENAME COLUMN filename TO source;
-- ALTER TABLE documents ADD COLUMN content_hash text;