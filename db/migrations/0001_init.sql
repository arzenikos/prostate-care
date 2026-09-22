DROP TABLE IF EXISTS chunks;
DROP TABLE IF EXISTS documents;

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documents (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_path   text NOT NULL UNIQUE,
  content_hash  text NOT NULL,
  title         text,
  ingested_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE chunks (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id   uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index   int NOT NULL,
  page_number   int,
  content       text NOT NULL,
  embedding     vector(768),
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX chunks_embedding_idx ON chunks USING hnsw (embedding vector_cosine_ops);
CREATE INDEX chunks_document_id_idx ON chunks(document_id);