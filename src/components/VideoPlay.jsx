import React from 'react'
import { IoClose } from "react-icons/io5";
import useFetchDetails from '../hook/useFetchDetails';

function VideoPlay({data, close, media_type}) {
    // เปลี่ยนชื่อตัวแปรที่ถูก destructure เพื่อหลีกเลี่ยงความขัดแย้งกับ props
    const {data: videoData} = useFetchDetails(`/${media_type}/${data?.id}/videos`);
    console.log("Video Data:", videoData);
    return (
        <section className='fixed bg-neutral-700/50 top-0 right-0 left-0 bottom-0 z-40 flex justify-center items-center'>
            <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative'>

                <button onClick={close} className='absolute -right-1 -top-6 cursor-pointer text-3xl z-50'>
                    <IoClose/>
                </button>
                
                <iframe 
                    src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
                    className='w-full h-full'
                />

            </div>
        </section>
    )
}

export default VideoPlay