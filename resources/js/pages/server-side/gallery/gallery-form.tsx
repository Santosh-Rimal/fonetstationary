// components/GalleryAddForm.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import notices from '@/routes/notices';
import { Head, useForm } from '@inertiajs/react';
import { useState, ChangeEvent } from 'react';
import galleries from '@/routes/galleries';
import InputError from '@/components/input-error';


export default function GalleryAddForm({ ...props }) {
    const { gallery, isEdit, isShow } = props;

    console.log('gallery: ', gallery, 'Edit: ', isEdit, 'Show: ', isShow);
    const [tempImage, setTempImage] = useState<string | null>(null);

    // Inertia form state
    const { data, setData, post, processing, reset, errors } = useForm<{
        title: string;
        description: string;
        gallery_image: File | null;
        _method: string;
    }>({
        title: gallery?.title || '',
        description: gallery?.description || '',
        gallery_image: null as File | null,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: isShow ? `Show ${gallery?.title}` : isEdit ? `Edit ${gallery?.title}` : 'Add Gallery Photo',
            href: notices.create.url(),
        },
    ];
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('gallery_image', e.target.files ? e.target.files[0] : null);
        setTempImage(e.target.files ? URL.createObjectURL(e.target.files[0]) : null);
    }

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (isEdit) {
            post(galleries.update.url(gallery.id), {
                forceFormData: true,
                onSuccess: () => reset(),
                preserveScroll: true,
            });
            console.log(data)
        } else {
            post(galleries.store.url(), {
                onSuccess: () => reset(),
                preserveScroll: true,
            });
            console.log(data)
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? `Edit ${gallery?.title}` : isShow ? `Show ${gallery?.title}` : 'Add Gallery Photo'} />
            <div className="max-w-3xl mx-auto p-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
                    <h2 className="text-2xl font-bold text-blue-600 mb-1">{isEdit ? `Edit ${gallery?.title}` : isShow ? `Show ${gallery?.title}` : 'Add Gallery Photo'}</h2>
                    <p className="text-sm text-gray-500 mb-6">{isEdit ? `Edit ${gallery?.title} As required` : isShow ? `Show ${gallery?.title}` : 'Fill the form to add gallery photos'}</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Title
                            </label>
                            <input
                                id="title"
                                disabled={isShow || processing}
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                type="text"
                                placeholder="Enter title"
                                className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <InputError message={errors.title} />
                        </div>


                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Description
                            </label>
                            <textarea
                                disabled={isShow || processing}
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                placeholder="Write description..."
                                className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <InputError message={errors.description} />
                        </div>

                        {/* Image */}
                        <div>
                            <label htmlFor="notice_image" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Image
                            </label>
                            {!isShow && (<input
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
                            />)}
                            {
                                tempImage ? (
                                    <img src={tempImage} alt="Selected" className="mt-4 w-32 h-32 object-cover rounded" />
                                ) : (
                                    gallery?.gallery_image ? (
                                        <img src={`http://127.0.0.1:8000${gallery.gallery_image}`} alt={gallery.title} className="mt-4 w-32 h-32 object-cover rounded" />
                                    ) : (
                                        <p className="mt-4 text-sm text-gray-500">No image available</p>
                                    )
                                )
                            }
                            <InputError message={errors.gallery_image} />


                        </div>

                        {/* Submit */}
                        {!isShow && <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60"
                            >
                                {isEdit && processing ? 'Updating...' : isEdit ? 'Update Gallery Photo' : processing ? 'Adding...' : 'Add Gallery Photo'}
                            </button>
                        </div>}
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}