import {useEffect, useState} from 'react';
import {getLinkPreview} from 'link-preview-js';

export const LinkPreview = (props: any) => {
	const {href, children} = props;
	const [linkPreview, setLinkPreview] = useState<LinkMetaData | null>(null);
	
	useEffect(() => {
		const fetchLinkPreview = async () => {
			try {
				const data = await getLinkPreview(href);
				//@ts-ignore
				setLinkPreview(data);
			} catch (error) {
				console.error('Error fetching link preview:', error);
			}
		};
		
		fetchLinkPreview();
	}, [href]);
	// todo: localstorage to store link metadata for scroll bug
	return (
		 <>
			 <a href={href} target="_blank" rel="noopener noreferrer">
				 {children}
			 </a>
			 
			 {linkPreview && (
					<div className="link-preview">
						
						<LinkCard
							 linkMetaData={linkPreview}
						/>
					
					</div>
			 
			 )}
		 </>
	);
};

interface LinkMetaData {
	title: string;
	description: string;
	url: string;
	siteName: string;
	images: string[];
}

export default function LinkCard({linkMetaData}: { linkMetaData: LinkMetaData }) {
	return (
		 <div
				className="  overflow-hidden max-w-md border-l-2 border-violet-500  rounded-lg rounded-l-none bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950 shadow">
			 <div className="px-4 pt-2 sm:px-6 flex flex-col gap-1 ">
				 <span className="text-xs">{linkMetaData.siteName}</span>
				 <a href={linkMetaData.url} className="line-clamp-2 !no-underline hover:!underline" rel="noopener noreferrer">
					 {linkMetaData.title}
				 </a>
				 <p className="text-xs">{linkMetaData.description}</p>
			 </div>
			 <div className="px-4  ">
				 <img src={linkMetaData.images[0]} className="w-full !mt-0 rounded-lg" alt={linkMetaData.title}/>
			 </div>
		 </div>
	)
}
