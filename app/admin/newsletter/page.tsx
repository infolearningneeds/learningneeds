import { supabaseAdmin } from "@/lib/supabase-admin";
import NewsletterContent from "./NewsletterContent";

const AdminNewsletterPage = async () => {
  const { data: newsletterEmails, error } = await supabaseAdmin
    .from("newsletter_subscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading newsletter emails:", error.message);
    return (
      <div className="min-h-screen bg-indigo-500/20 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <p className="text-red-600 font-semibold">Error loading subscribers</p>
          <p className="text-gray-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  console.log("Newsletter emails loaded:", newsletterEmails);
  console.log("Number of subscribers:", newsletterEmails?.length);

  return <NewsletterContent newsletterEmails={newsletterEmails || []} />;
};

export default AdminNewsletterPage;