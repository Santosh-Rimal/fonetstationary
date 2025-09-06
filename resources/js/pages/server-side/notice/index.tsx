
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import notices from '@/routes/notices';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Edit, Eye, Trash } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notices',
        href: notices.index.url(),
    },
];
export default function Notices() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notices" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link className='bg-blue-400 w-fit p-2 rounded' href={notices.create.url()}>Create Notice</Link>
                <Table className='border rounded'>
                    <TableCaption>All Notices Details</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Sn</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>is Active?</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        <TableRow>
                            <TableCell className="font-medium">1</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>
                                {/* {notice.notice_image ? (
                                        <img src={notice.notice_image} alt={notice.name} className="w-12 h-12 object-cover rounded" />
                                    ) : (
                                        'No Image'
                                    )} */}
                                No Image
                            </TableCell>

                            <TableCell>Is Active or not</TableCell>
                            <TableCell className="text-right flex gap-2 justify-end">
                                {/* <button onClick={(e) => {
                                    if (confirm('Are you sure to Delete this Service')) {
                                        router.delete(notices.destroy.url(notice.id)), {
                                            preserveScroll: true,
                                        }
                                    }
                                }} className="text-red-600 hover:cursor-pointer"> */}
                                <Trash />
                                {/* </button> */}
                                {/* <button onClick={() => { router.get(notices.edit.url(notice.id)) }} className="text-blue-600 hover:cursor-pointer"> */}
                                <Edit />
                                {/* </button> */}
                                {/* <button onClick={() => { router.get(notices.show.url(notice.id)) }} className="text-green-600 hover:cursor-pointer"> */}
                                <Eye />
                                {/* </button> */}
                            </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>
            </div>
        </AppLayout>
    );
}
