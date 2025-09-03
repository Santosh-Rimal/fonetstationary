
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import services from '@/routes/services';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Edit, Trash, View } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Services',
        href: services.index.url(),
    },
];
interface service {
    id: number;
    price: number;
    name: string;
    'offer_price': number;
    'discount': number;
    'service_image': string;
    'description': string;

}
export default function Services({ allservices = [] }: { allservices: service[] }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link className='bg-blue-400 w-fit p-2 rounded' href={services.create.url()}>Create Service</Link>
                <Table className='border rounded'>
                    <TableCaption>All Services Details</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Sn</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Offer Price</TableHead>
                            <TableHead>Short Description</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allservices && allservices.map((service, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{service.name}</TableCell>
                                <TableCell>
                                    {service.service_image ? (
                                        <img src={service.service_image} alt={service.name} className="w-12 h-12 object-cover rounded" />
                                    ) : (
                                        'No Image'
                                    )}
                                </TableCell>
                                <TableCell>{service.price}</TableCell>
                                <TableCell>{service.discount ? `${service.discount}%` : '0%'}</TableCell>
                                <TableCell>{service.offer_price || service.price}</TableCell>
                                <TableCell>{service.description}</TableCell>
                                <TableCell className="text-right flex gap-2 justify-end">
                                    <button onClick={(e) => {
                                        if (confirm('Are you sure to Delete this Service')) {
                                            router.delete(services.destroy.url(service.id)), {
                                                preserveScroll: true,
                                            }
                                        }
                                    }} className="text-red-600 hover:cursor-pointer">
                                        <Trash />
                                    </button>
                                    <button className="text-blue-600 hover:cursor-pointer">
                                        <Edit />
                                    </button>
                                    <button className="text-green-600 hover:cursor-pointer">
                                        <View />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>
        </AppLayout>
    );
}
