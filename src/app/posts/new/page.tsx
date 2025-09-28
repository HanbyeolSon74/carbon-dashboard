import Navigation from "@/components/Navigation";
import NewPostForm from "./NewPostForm";

export default function NewPostPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navigation />

      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <header className="pb-4 border-b border-gray-200 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Create New Report
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the form below to publish a new report.
          </p>
        </header>

        {/* Client Component */}
        <NewPostForm />
      </main>
    </div>
  );
}
