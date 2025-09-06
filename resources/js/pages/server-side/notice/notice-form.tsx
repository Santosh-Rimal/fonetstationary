import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import notices from '@/routes/notices';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input, Textarea } from '@headlessui/react';
import { useState } from 'react';
import InputError from '@/components/input-error';



export default function Notices({ ...props }) {
    const [tempImage, setTempImage] = useState<string | null>(null);
    const { notice, isShow, isEdit } = props;
    const { data, setData, post, errors, processing, reset } = useForm({
        title: notice?.title || '',
        description: notice?.description || '',
        notice_image: null as File | null,
        is_active: notice?.is_active || false,
        _method: isEdit ? 'PUT' : 'POST',
    });
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: isShow
                ? `Show ${notice?.title}`
                : isEdit
                    ? `Edit ${notice?.title}`
                    : 'Create',
            href: notices.create.url(),
        },
    ];

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEdit) {
            post(notices.update.url(notice.id), {
                forceFormData: true,
                onSuccess: () => reset(),
            });
        }
        post(notices.store.url(), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    }

    const handelFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('notice_image', e.target.files[0]);
            setTempImage(URL.createObjectURL(e.target.files[0]));
        }
    }

    console.log(notice);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isShow ? `Show ${notice?.title}` : isEdit ? `Edit ${notice?.title}` : 'Create'} />
            <Card>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                {isShow ? `Show ${notice?.title}` : isEdit ? `Edit ${notice?.title}` : 'Create'}
                            </h2>
                        </CardTitle>
                        <CardDescription>
                            Fill the form to create a new notice.
                        </CardDescription>
                    </CardHeader>

                    <form onSubmit={handelSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6" encType="multipart/form-data">
                        {/* Notice Title */}
                        <CardContent>
                            <div>
                                <Label
                                    htmlFor="title"
                                    className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                                >
                                    Notioce Title
                                </Label>
                                <Input
                                    disabled={isShow || processing}
                                    onChange={(e) => setData('title', e.target.value)}
                                    value={data.title}
                                    name='title'
                                    type="text"
                                    id="title"
                                    placeholder="Enter service title"
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <InputError message={errors.title} />
                            </div>
                        </CardContent>

                        {/* Description */}
                        <CardContent>
                            <div>
                                <Label
                                    htmlFor="description"
                                    className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                                >
                                    Description
                                </Label>
                                <Textarea
                                    disabled={isShow || processing}
                                    onChange={(e) => setData('description', e.target.value)}
                                    value={data.description}
                                    id="description"
                                    name='description'

                                    rows={4}
                                    placeholder="Write service details..."
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <InputError message={errors.description} />
                            </div>
                        </CardContent>

                        {/* Notice Image */}
                        <CardContent>
                            <div>
                                <Label
                                    htmlFor="notice_image"
                                    className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                                >
                                    Image
                                </Label>
                                {/* File input: show if not editing/showing */}

                                {!isShow && isEdit && (<Input
                                    name="notice_image"
                                    type="file"
                                    onChange={handelFileUpload}
                                    id="notice_image"
                                    className="mt-2 w-full text-gray-700 dark:text-gray-100 dark:file:bg-gray-700 dark:file:text-gray-200 
                                            file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                                            file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 dark:hover:file:bg-gray-600"
                                />)}
                                {tempImage ? (
                                    <img
                                        src={tempImage}
                                        alt="Preview"
                                        className="mt-4 h-48 w-auto rounded-lg object-cover"
                                    />
                                ) : notice?.notice_image ? (
                                    <img
                                        src={`http://127.0.0.1:8000${notice?.notice_image}`}
                                        alt={notice?.title}
                                        className="mt-4 h-48 w-auto rounded-lg object-cover"
                                    />) : 'No Image Selected'}



                                <InputError message={errors.notice_image} />
                            </div>
                        </CardContent>


                        {/* Is Active */}
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <Label
                                    htmlFor="is_active"
                                    className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                                >
                                    Is Active?
                                </Label>

                                <label className="relative inline-flex items-center cursor-pointer">
                                    <Input
                                        disabled={isShow || processing}
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                    />

                                    <div className="w-[60px] h-[34px] bg-gray-300 peer-checked:bg-blue-500 rounded-full transition-colors duration-300"></div>
                                    <div className="absolute left-1 top-1 bg-white w-[26px] h-[26px] rounded-full transition-transform duration-300 peer-checked:translate-x-[26px]"></div>
                                </label>
                            </div>
                            <InputError message={errors.is_active} />
                        </CardContent>




                        {/* Submit */}
                        {!isShow && (
                            <div>
                                <button
                                    disabled={processing}
                                    type="submit"

                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                                >
                                    {processing ? isEdit ? 'Updating...' : 'Saving...' : isEdit ? 'Update Notice' : 'Create Notice'}
                                </button>



                            </div>
                        )}
                    </form>
                </div>
            </Card>
        </AppLayout>
    );
}