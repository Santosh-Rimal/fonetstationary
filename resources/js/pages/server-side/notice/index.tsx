
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import NoticeController from '@/actions/App/Http/Controllers/NoticeController';
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
        href: NoticeController.index.url(),
    },
];
interface notice {
    id: number;
    title: string;
    description: string;
    notice_image: string;
    is_active: number;
}
export default function Notices({ ...props }: { notices: notice[] }) {
    const { notices } = props;
    const { flash } = usePage<{ flash: { error?: string, success?: string } }>().props;
    console.log(notices);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notices" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link className='bg-blue-400 w-fit p-2 rounded' href={NoticeController.create.url()}>Create Notice</Link>
                {
                    flash?.success && (
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
                        {notices && notices.length > 0 ? notices.map((notice, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index}</TableCell>
                                <TableCell>{notice.title}</TableCell>
                                <TableCell>{notice.description}</TableCell>
                                <TableCell>
                                    {notice.notice_image ? (
                                        <img src={notice.notice_image} alt={notice.title} className="w-12 h-12 object-cover rounded" />
                                    ) : (
                                        'No Image'
                                    )}
                                </TableCell>

                                <TableCell className={notice.is_active === 1 ? 'text-green-400' : 'text-red-400'}>{notice.is_active === 1 ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell className="text-right flex gap-2 justify-end">
                                    <button onClick={(e) => {
                                        if (confirm('Are you sure to Delete this Service')) {
                                            router.delete(NoticeController.destroy.url(notice.id)), {
                                                preserveScroll: true,
                                            }
                                        }
                                    }} className="text-red-600 hover:cursor-pointer">
                                        <Trash />
                                    </button>
                                    <button onClick={() => { router.get(NoticeController.edit.url(notice.id)) }} className="text-blue-600 hover:cursor-pointer">
                                        <Edit />
                                    </button>
                                    <button onClick={() => { router.get(NoticeController.show.url(notice.id)) }} className="text-green-600 hover:cursor-pointer">
                                        <Eye />
                                    </button>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow><TableCell colSpan={6} className="text-center">No Notices Found</TableCell></TableRow>
                        }
                    </TableBody>

                </Table>
            </div>
        </AppLayout>
    );
}
