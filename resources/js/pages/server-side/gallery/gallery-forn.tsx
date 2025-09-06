// components/GalleryAddForm.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import notices from '@/routes/notices';
import { Head, useForm } from '@inertiajs/react';
import { useState, ChangeEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Gallery Item',
    href: notices.create.url(),
  },
];

export default function GalleryAddForm() {
  // Inertia form state
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    serviceName: '',
    description: '',
    // notice_image can be single File or array; we'll accept multiple files optionally.
    notice_image: null as File | null,
  });

  // Local preview state (supports multiple preview images if user chooses)
  const [previews, setPreviews] = useState<string[]>([]);

  // Handle text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input (supports single or multiple files)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setData((prev) => ({ ...prev, notice_image: null }));
      setPreviews([]);
      return;
    }

    // If you want to support multiple images, you'd store files differently (e.g. File[]).
    // Here we keep a single File (first file) but show previews of all selected files.
    const firstFile = files[0];
    setData((prev) => ({ ...prev, notice_image: firstFile }));

    // Build previews (data URLs)
    const urls: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          urls.push(reader.result as string);
          // Update previews after each read to show progressively
          setPreviews([...urls]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Submit: build FormData and post
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('serviceName', data.serviceName);
    formData.append('description', data.description);

    if (data.notice_image) {
      formData.append('notice_image', data.notice_image);
    }

    // Replace '/gallery' with your actual route or use route helper if available:
    post('/gallery', {
      forceFormData: true, // depending on your Inertia setup, this helps send FormData
      onFinish: () => {
        // optionally reset the form and previews after successful submit
        reset();
        setPreviews([]);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Gallery Item" />
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-1">Add Gallery Item</h2>
          <p className="text-sm text-gray-500 mb-6">Fill the form to add a gallery item.</p>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Title
              </label>
              <input
                id="title"
                name="title"
                value={data.title}
                onChange={handleChange}
                type="text"
                placeholder="Enter title"
                className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Service Name */}
            <div>
              <label htmlFor="serviceName" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Service Name
              </label>
              <input
                id="serviceName"
                name="serviceName"
                value={data.serviceName}
                onChange={handleChange}
                type="text"
                placeholder="Enter service name"
                className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.serviceName && <p className="mt-1 text-sm text-red-600">{errors.serviceName}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={data.description}
                onChange={handleChange}
                rows={4}
                placeholder="Write description..."
                className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Image */}
            <div>
              <label htmlFor="notice_image" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Image
              </label>
              <input
                id="notice_image"
                name="notice_image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                // If you want to allow multiple images, uncomment the next line:
                // multiple
                className="mt-2 w-full text-gray-700 dark:text-gray-100 dark:file:bg-gray-700 dark:file:text-gray-200
                           file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
                           file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 dark:hover:file:bg-gray-600"
              />
              {errors.notice_image && <p className="mt-1 text-sm text-red-600">{errors.notice_image}</p>}

              {/* Previews */}
              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {previews.map((src, idx) => (
                    <div key={idx} className="w-full aspect-square rounded overflow-hidden border">
                      <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
              >
                {processing ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
