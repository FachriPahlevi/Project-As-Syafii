import { usePage, Link } from '@inertiajs/react';
import {
    HomeModernIcon,
    UserGroupIcon,
    NewspaperIcon,
    BanknotesIcon,
    ClipboardDocumentCheckIcon,
    DocumentDuplicateIcon,
    CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function Sidebar() {
    const { url } = usePage();
    const menu1 = [
        { name: 'Dashboard', icon: <HomeModernIcon width={18} className="text-slate-400 font-bold text-xl" />, path: '/' },
        { name: 'Siswa', icon: <UserGroupIcon width={18} className="text-slate-400" />, path: '/siswa' },
        { name: 'Laporan', icon: <ClipboardDocumentCheckIcon width={18} className="text-slate-400" />, path: '/laporan' },
        { name: 'Tabungan', icon: <BanknotesIcon width={18} className="text-slate-400" />, path: '/tabungan' },
        { name: 'Daftar Ulang', icon: <DocumentDuplicateIcon width={18} className="text-slate-400" />, path: '/daftar-ulang' },
        { name: 'SPP', icon: <CurrencyDollarIcon width={18} className="text-slate-400" />, path: '/pembayaran' },
    ];

    // const menu2 = [
    //     { name: 'Chat', icon: <ChatBubbleLeftIcon width={18} className="text-white" />, path: '/chat' },
    //     { name: 'Notes', icon: <ClipboardDocumentIcon width={18} className="text-white" />, path: '/notes' },
    //     { name: 'Customers', icon: <UsersIcon width={18} className="text-white" />, path: '/customers' },
    //     { name: 'Mail', icon: <EnvelopeIcon width={18} className="text-white" />, path: '/mail' },
    // ];

    // const menu3 = [
    //     { name: 'Login', icon: <PowerIcon width={18} className="text-white" />, path: '/login' },
    //     { name: 'Register', icon: <CursorArrowRippleIcon width={18} className="text-white" />, path: '/register' },
    //     { name: 'Error', icon: <FaceFrownIcon width={18} className="text-white" />, path: '/error' },
    // ];

    return (
        <div className="bg-white text-slate-300 h-screen sm:w-64 w-20 fixed top-0 left-0 tracking-wide">
            <div className="flex text-white mx-3 rounded-md p-1 sm:p-2 mt-6">
                <img
                    className="object-cover w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="coba"
                />
                <div className="ml-3 items-center hidden sm:block mb-8">
                    <div className="text-md shadow text-black font-bold">Syafira Aulia</div>
                    <div className="text-xs font-medium text-slate-400">Bendahara</div>
                </div>
            </div>
            <div className="text-sm">
                <Menus menu={menu1} title={{ sm: 'BUSINESS', xs: 'BUSINESS' }} url={url} />
            </div>
            {/* <div className="text-sm">
                <Menus menu={menu2} title={{ sm: 'APPLICATION', xs: 'APP' }} url={url} />
            </div>
            <div className="text-sm">
                <Menus menu={menu3} title={{ sm: 'AUTHENTICATION', xs: 'Auth' }} url={url} />
            </div> */}
        </div>
    );
}

function Menus({ menu, url }) {
    return (
        <div className="py-3">
            <ul>
                {menu.map((val, index) => {
                    const isActive = url.toLowerCase() === val.path.toLowerCase();
                    const menuActive = isActive
                        ? 'bg-blue-500 text-blue-500 bg-opacity-10 rounded-md p-2'
                        : 'px-3 py-2';
                    const textActive = isActive ? 'text-blue-500' : 'text-slate-400';

                    return (
                        <Link key={index} href={val.path}>
                            <li className={`${menuActive} cursor-pointer mx-5 text-lg font-medium mb-3 flex hover:bg-blue-200 rounded-md`}>
                                {val.icon}
                                <div className={`ml-2 ${textActive} hidden sm:block`}>
                                    {val.name}
                                </div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}
