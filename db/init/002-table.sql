CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  filename TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE chunks (
  id bigserial PRIMARY KEY,
  document_id int NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  chunk_index int NOT NULL,
  page int,
  content text NOT NULL,
  embedding vector(768) NOT NULL,  -- nomic-embed-text = 768 dims
  UNIQUE (document_id, chunk_index)
);
