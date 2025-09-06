import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import notices from '@/routes/notices';
import Switch from '@/components/ui/switch';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input, Textarea } from '@headlessui/react';
import { useState } from 'react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Notice',
        href: notices.create.url(),
    },
];

export default function Notices() {
    const [status, setStatus] = useState('active');
    const { post, errors, processing, reset } = useForm({
        title: '',
        description: '',
        notice_image: null as File | null,
        is_active: false,
    });
    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Notice" />
            <Card>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                Create Notice
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
                                    name='title'
                                    type="text"
                                    id="title"
                                    placeholder="Enter service title"
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {/* <InputError message={errors.title} /> */}
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

                                    id="description"
                                    name='description'

                                    rows={4}
                                    placeholder="Write service details..."
                                    className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {/* <InputError message={errors.description} /> */}
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

                                <Input
                                    name="notice_image"
                                    type="file"
                                    id="notice_image"
                                    className="mt-2 w-full text-gray-700 dark:text-gray-100 dark:file:bg-gray-700 dark:file:text-gray-200 
                                            file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                                            file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 dark:hover:file:bg-gray-600"
                                />



                                {/* <InputError message={errors.service_image} /> */}
                            </div>
                        </CardContent>


                        {/* Is Active */}
                        <CardContent>
                            <div>
                                <Label
                                    htmlFor="is_ative"
                                    className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                                >
                                    Is Active?
                                </Label>

                                <Switch />
                                {/* <InputError message={errors.price} /> */}
                            </div>

                        </CardContent>



                        {/* Submit */}
                        <div>
                            <button
                                type="submit"

                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                Save Notice
                            </button>



                        </div>
                    </form>
                </div>
            </Card>
        </AppLayout>
    );
}