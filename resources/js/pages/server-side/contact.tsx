
import AppLayout from '@/layouts/app-layout';
import { index, destroy } from '@/routes/contacts';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contacts',
        href: index.url(),
    },
];
interface contact {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    message: string,
    phone: string,
    file: string
}
interface Flash {
    success?: string,
    error?: string
}
export default function Contacts({ contacts = [] }: { contacts: contact[] }) {
    const { flash } = usePage<{ flash: Flash }>().props;
    // const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props
    console.log(flash)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {
                    flash.success && (
                        <Alert
                            className={`flex justify-center px-4 py-2 rounded-md mb-4 shadow-md 
              ${flash?.success
                                    ? 'bg-green-500 animate-pulse'
                                    : 'bg-red-500 animate-bounce'}`}
                        >
                            <AlertDescription className="text-white">
                                {flash?.success || flash?.error}
                            </AlertDescription>
                        </Alert>

                    )
                }
                <Table className='border rounded'>
                    <TableCaption>All Contact Details</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Sn</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>File/Image</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            contacts && contacts.map((contact, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{contact.first_name + ' ' + contact.last_name}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.message}</TableCell>
                                    <TableCell>
                                        {contact.file ? (
                                            contact.file.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                                                // If file is an image
                                                <img
                                                    src={contact.file}
                                                    alt="Uploaded"
                                                    className="h-16 w-16 object-cover rounded"
                                                />
                                            ) : (
                                                // If file is not an image → show download link
                                                <a
                                                    href={contact.file}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View File
                                                </a>
                                            )
                                        ) : (
                                            <span className="text-gray-500">No file</span>
                                        )}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <button onClick={() => {
                                            if (confirm('Are you Sure to Delete')) {
                                                (router.delete(destroy(contact.id)), {
                                                    preserveScroll: true,
                                                });
                                            }
                                        }} className='text-red-600 hover:cursor-pointer'>
                                            <Trash />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
