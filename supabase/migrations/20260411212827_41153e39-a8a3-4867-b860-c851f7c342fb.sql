-- Cached scholarships from AI search results
CREATE TABLE public.cached_scholarships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT NOT NULL,
  amount TEXT NOT NULL,
  deadline TEXT NOT NULL,
  source_category TEXT NOT NULL CHECK (source_category IN ('government', 'nonprofit', 'tech', 'conference', 'organization')),
  description TEXT NOT NULL,
  min_gpa NUMERIC(3,1) NOT NULL,
  states TEXT NOT NULL DEFAULT 'all',
  fields TEXT NOT NULL,
  apply_url TEXT NOT NULL,
  source_url TEXT NOT NULL,
  search_gpa NUMERIC(3,1) NOT NULL,
  search_state TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '24 hours'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for fast cache lookups
CREATE INDEX idx_cached_scholarships_search ON public.cached_scholarships (search_gpa, search_state);
CREATE INDEX idx_cached_scholarships_expires ON public.cached_scholarships (expires_at);

-- Enable RLS
ALTER TABLE public.cached_scholarships ENABLE ROW LEVEL SECURITY;

-- Anyone can read cached scholarships (public tool, no auth)
CREATE POLICY "Anyone can read cached scholarships"
  ON public.cached_scholarships
  FOR SELECT
  USING (true);

-- Service role only can insert (edge functions use service role)
CREATE POLICY "Service role can insert cached scholarships"
  ON public.cached_scholarships
  FOR INSERT
  WITH CHECK (true);

-- Service role can delete expired entries
CREATE POLICY "Service role can delete cached scholarships"
  ON public.cached_scholarships
  FOR DELETE
  USING (true);