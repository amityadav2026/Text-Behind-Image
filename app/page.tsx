'use client'

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { removeBackground } from "@imgly/background-removal";

const Page = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
    const [removedBgImageUrl, setRemovedBgImageUrl] = useState<string | null>(null);
    const [textSets, setTextSets] = useState<Array<any>>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleUploadImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            console.log('Selected image:', imageUrl);
            setSelectedImage(imageUrl);
            await setupImage(imageUrl);
        }
    };

    const setupImage = async (imageUrl: string) => {
        try {
            const imageBlob = await removeBackground(imageUrl);
            console.log('Removed bg image:', imageBlob);
            const url = URL.createObjectURL(imageBlob);
            console.log('Removed bg image url:', url);
            setRemovedBgImageUrl(url);
            setIsImageSetupDone(true);
        } catch (error) {
            console.error(error);
        }
    };

    const addNewTextSet = () => {
        const newId = Math.max(...textSets.map(set => set.id), 0) + 1;
        setTextSets(prev => [...prev, {
            id: newId,
            text: 'edit',
            fontFamily: 'Inter',
            top: 0,
            left: 0,
            color: 'white',
            fontSize: 200,
            fontWeight: 800,
            opacity: 1,
            shadowColor: 'rgba(0, 0, 0, 0.8)',
            shadowSize: 4,
            rotation: 0,
            tiltX: 0,
            tiltY: 0
        }]);
    };

    const handleAttributeChange = (id: number, attribute: string, value: any) => {
        setTextSets(prev => prev.map(set => 
            set.id === id ? { ...set, [attribute]: value } : set
        ));
    };

    const removeTextSet = (id: number) => {
        setTextSets(prev => prev.filter(set => set.id !== id));
    };

    const saveCompositeImage = () => {
        if (!canvasRef.current || !isImageSetupDone) return;
    
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
    
        const bgImg = new window.Image();
        bgImg.crossOrigin = "anonymous";
        bgImg.onload = () => {
            canvas.width = bgImg.width;
            canvas.height = bgImg.height;
    
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    
            textSets.forEach(textSet => {
                ctx.save();
                
                ctx.font = `${textSet.fontWeight} ${textSet.fontSize * 3}px ${textSet.fontFamily}`;
                ctx.fillStyle = textSet.color;
                ctx.globalAlpha = textSet.opacity;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
    
                const x = canvas.width * (textSet.left + 50) / 100;
                const y = canvas.height * (50 - textSet.top) / 100;
    
                ctx.translate(x, y);
                
                const tiltXRad = (-textSet.tiltX * Math.PI) / 180;
                const tiltYRad = (-textSet.tiltY * Math.PI) / 180;
    
                ctx.transform(
                    Math.cos(tiltYRad),
                    Math.sin(0),
                    -Math.sin(0),
                    Math.cos(tiltXRad),
                    0,
                    0
                );
    
                ctx.rotate((textSet.rotation * Math.PI) / 180);
    
                ctx.fillText(textSet.text, 0, 0);
                ctx.restore();
            });
    
            if (removedBgImageUrl) {
                const removedBgImg = new window.Image();
                removedBgImg.crossOrigin = "anonymous";
                removedBgImg.onload = () => {
                    ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
                    triggerDownload();
                };
                removedBgImg.src = removedBgImageUrl;
            } else {
                triggerDownload();
            }
        };
        bgImg.src = selectedImage || '';
    
        function triggerDownload() {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'text-behind-image.png';
            link.href = dataUrl;
            link.click();
        }
    };
    
    return (
        <div className='flex flex-col h-screen'>
            <header className='flex flex-row items-center justify-between p-5 px-10'>
                <h2 className="text-4xl md:text-2xl font-semibold tracking-tight">
                    <span className="block md:hidden">TBI</span>
                    <span className="hidden md:block">Text behind image editor</span>
                </h2>
                <div className='flex gap-4 items-center'>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept=".jpg, .jpeg, .png"
                    />
                    <button 
                        onClick={handleUploadImage}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Upload image
                    </button>
                    {selectedImage && (
                        <button 
                            onClick={saveCompositeImage}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Save image
                        </button>
                    )}
                </div>
            </header>
            <div className="h-px bg-gray-200 w-full" />
            {selectedImage ? (
                <div className='flex flex-col md:flex-row items-start justify-start gap-10 w-full h-screen px-10 mt-2'>
                    <div className="flex flex-col items-start justify-start w-full md:w-1/2 gap-4">
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                        <div className="min-h-[400px] w-[80%] p-4 border border-gray-200 rounded-lg relative overflow-hidden">
                            {isImageSetupDone ? (
                                <Image
                                    src={selectedImage} 
                                    alt="Uploaded"
                                    layout="fill"
                                    objectFit="contain" 
                                    objectPosition="center" 
                                />
                            ) : (
                                <span className='flex items-center w-full gap-2'>Loading, please wait...</span>
                            )}
                            {isImageSetupDone && textSets.map(textSet => (
                                <div
                                    key={textSet.id}
                                    style={{
                                        position: 'absolute',
                                        top: `${50 - textSet.top}%`,
                                        left: `${textSet.left + 50}%`,
                                        transform: `
                                            translate(-50%, -50%) 
                                            rotate(${textSet.rotation}deg)
                                            perspective(1000px)
                                            rotateX(${textSet.tiltX}deg)
                                            rotateY(${textSet.tiltY}deg)
                                        `,
                                        color: textSet.color,
                                        textAlign: 'center',
                                        fontSize: `${textSet.fontSize}px`,
                                        fontWeight: textSet.fontWeight,
                                        fontFamily: textSet.fontFamily,
                                        opacity: textSet.opacity,
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {textSet.text}
                                </div>
                            ))}
                            {removedBgImageUrl && (
                                <Image
                                    src={removedBgImageUrl}
                                    alt="Removed bg"
                                    layout="fill"
                                    objectFit="contain" 
                                    objectPosition="center" 
                                    className="absolute top-0 left-0 w-full h-full"
                                /> 
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col w-full md:w-1/2'>
                        <button 
                            onClick={addNewTextSet}
                            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 flex items-center gap-2"
                        >
                            <span>+</span> Add New Text Set
                        </button>
                        <div className="mt-4">
                            {textSets.map(textSet => (
                                <div key={textSet.id} className="mb-4 p-4 border border-gray-200 rounded">
                                    <div className="flex justify-between mb-2">
                                        <input
                                            type="text"
                                            value={textSet.text}
                                            onChange={(e) => handleAttributeChange(textSet.id, 'text', e.target.value)}
                                            className="border p-1 rounded"
                                        />
                                        <button 
                                            onClick={() => removeTextSet(textSet.id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-sm">Font Size</label>
                                            <input
                                                type="range"
                                                min="10"
                                                max="400"
                                                value={textSet.fontSize}
                                                onChange={(e) => handleAttributeChange(textSet.id, 'fontSize', parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm">Color</label>
                                            <input
                                                type="color"
                                                value={textSet.color}
                                                onChange={(e) => handleAttributeChange(textSet.id, 'color', e.target.value)}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm">Rotation</label>
                                            <input
                                                type="range"
                                                min="-180"
                                                max="180"
                                                value={textSet.rotation}
                                                onChange={(e) => handleAttributeChange(textSet.id, 'rotation', parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm">Opacity</label>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={textSet.opacity}
                                                onChange={(e) => handleAttributeChange(textSet.id, 'opacity', parseFloat(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm">Position X</label>
                                            <input
                                                type="range"
                                                min="-50"
                                                max="50"
                                                value={textSet.left}
                                                onChange={(e) => handleAttributeChange(textSet.id, 'left', parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm">Position Y</label>
                                            <input
                                                type="range"
                                                min="-50"
                                                max="50"
                                                value={textSet.top}
                                                onChange={(e) => handleAttributeChange(textSet.id, 'top', parseInt(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex items-center justify-center min-h-screen w-full'>
                    <h2 className="text-xl font-semibold">Welcome, get started by uploading an image!</h2>
                </div>
            )}
        </div>
    );
}

export default Page; 