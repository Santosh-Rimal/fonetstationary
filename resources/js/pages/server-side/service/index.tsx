
import AppLayout from '@/layouts/app-layout';
import contacts from '@/routes/contacts';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
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
        title: 'Contacts',
        href: contacts.index.url(),
    },
];

export default function Services() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={services.create.url()}>Create Service</Link>
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
                        <TableCell className="font-medium"> 1</TableCell>
                        <TableCell>Tshirt print</TableCell>
                        <TableCell>No Image</TableCell>
                        <TableCell>1000</TableCell>
                        <TableCell>10%</TableCell>
                        <TableCell>900</TableCell>
                        <TableCell>fykhljklj</TableCell>
                        <TableCell className="text-right">
                            <button className='text-red-600 hover:cursor-pointer'>
                                <Trash />
                            </button>
                            <button className='text-blue-600 hover:cursor-pointer'>
                                <Edit />
                            </button>
                            <button className='text-green-600 hover:cursor-pointer'>
                                <View />
                            </button>
                        </TableCell>
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
