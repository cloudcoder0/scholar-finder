-- Drop permissive policies
DROP POLICY "Service role can insert cached scholarships" ON public.cached_scholarships;
DROP POLICY "Service role can delete cached scholarships" ON public.cached_scholarships;

-- Restrict insert to service role only (edge functions authenticate with service role key)
CREATE POLICY "Only service role can insert cached scholarships"
  ON public.cached_scholarships
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Only service role can delete cached scholarships"
  ON public.cached_scholarships
  FOR DELETE
  TO service_role
  USING (true);