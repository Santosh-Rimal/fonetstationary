import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import services from '@/routes/services';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useState } from 'react';


export default function Services({ ...props }) {
    const { service, isShow, isEdit } = props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isEdit ? 'Update' : isShow ? 'Show' : 'Create'} Services`,
            href: services.index.url(),
        },
    ];

    const [tempImage, setTempImage] = useState<string | null>(null);


    // console.log(service.service_image)
    const { data, setData, post, processing,errors, reset } = useForm({
        name: service?.name || '',
        price: service?.price || 0,
        offer_price: service?.offer_price || 0,
        service_image: null as File | null,
        discount: service?.discount || 0,
        description: service?.description || '',
        _method: isEdit ? 'PUT' : 'POST',
    });
    const handelSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (isEdit) {
            post(services.update.url(service.id), {
                forceFormData: true,
                onSuccess: () => reset(),
                preserveScroll: true,
            });
        } else {
            post(services.store.url(), {
                onSuccess: () => reset(),
                preserveScroll: true,
            });
        }
    };
    const handelFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setData('service_image', file);
            setTempImage(URL.createObjectURL(file)); // temporary preview
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Update Service' : isShow ? 'Show Service' : 'Add New Service'} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
                    {isEdit ? 'Update Service' : isShow ? 'Show Service' : 'Add New Service'}
                </h2>

                <form onSubmit={handelSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6" encType="multipart/form-data">
                    {/* Service Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Service Name
                        </label>
                        <input
                            name='name'
                            disabled={isShow || processing}
                            value={data.name}
                            onChange={(e) => { setData('name', e.target.value) }}
                            type="text"
                            id="name"
                            placeholder="Enter service name"
                            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Description
                        </label>
                        <textarea
                            disabled={isShow || processing}
                            value={data.description}
                            id="description"
                            name='description'
                            onChange={(e) => { setData('description', e.target.value) }}
                            rows={4}
                            placeholder="Write service details..."
                            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <InputError message={errors.description} />
                    </div>

                    {/* Service Image */}
                    <div>
                        <label
                            htmlFor="service_image"
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Service Image
                        </label>
                        {/* File input: show if not editing/showing */}
                        {!isShow && (
                            <input
                                disabled={isShow || processing}
                                name="service_image"
                                onChange={handelFileUpload}
                                type="file"
                                id="service_image"
                                className="mt-2 w-full text-gray-700 dark:text-gray-100 dark:file:bg-gray-700 dark:file:text-gray-200 
                 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 dark:hover:file:bg-gray-600"
                            />
                        )}

                        {/* Existing image: show if editing and service has an image */}

                        {tempImage ?
                            (<img
                                src={tempImage}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-md border mt-2"
                            />) : service?.service_image ? (<img
                                src={`http://127.0.0.1:8000${service.service_image}`}
                                alt={service.name}
                                className="w-32 h-32 object-cover rounded-md border mt-2"
                            />) : ''}
                        {/* Error message */}
                        <InputError message={errors.service_image} />
                    </div>


                    {/* Price */}
                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Price
                        </label>
                        <input
                            disabled={isShow || processing}
                            type="number"
                            value={data.price}
                            id="price"
                            name='price'
                            onChange={(e) => { setData('price', Number(e.target.value)) }}
                            placeholder="Enter price"
                            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <InputError message={errors.price} />
                    </div>

                    {/* Offer Price */}
                    <div>
                        <label
                            htmlFor="offer_price"
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Offer Price
                        </label>
                        <input
                            disabled={isShow || processing}
                            type="number"
                            value={data.offer_price}
                            id="offer_price"
                            name='offer_price'
                            onChange={(e) => { setData('offer_price', Number(e.target.value)) }}
                            placeholder="Enter offer price (optional)"
                            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <InputError message={errors.offer_price} />
                    </div>

                    {/* Discount */}
                    <div>
                        <label
                            htmlFor="discount"
                            className="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                        >
                            Discount (%)
                        </label>
                        <input
                            disabled={isShow || processing}
                            value={data.discount}
                            type="number"
                            id="discount"
                            name='discount'
                            onChange={(e) => { setData('discount', Number(e.target.value)) }}
                            placeholder="Enter discount (optional)"
                            className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <InputError message={errors.discount} />
                    </div>

                    {/* Submit */}
                    <div>
                        {
                            isShow ? '' : <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                            >
                                {processing ? (isEdit ? 'Updating...' : 'Saving...') : (isEdit ? 'Update Service' : 'Save Service')}
                            </button>
                        }


                    </div>
                </form>
            </div>
        </AppLayout >
    );
}
