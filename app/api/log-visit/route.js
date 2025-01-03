import { supabase } from '../../supabase';

export async function POST(request) {
  try {
    // Parse the request body to get the articleId
    const { articleId } = await request.json();

    // Retrieve the client's IP address
    const ipAddress =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Insert the visit into the ArticleVisits table
    const { error } = await supabase
      .from('ArticleVisits')
      .insert([{ article_id: articleId, ip_address: ipAddress }]);

    // Handle any Supabase error
    if (error) {
      console.error('Supabase error:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
      });
    }

    // Return success response
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    // Handle any unexpected error
    console.error('API error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
