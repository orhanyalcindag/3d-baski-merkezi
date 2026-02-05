"use client"; // Next.js kullanıyorsan bunu en üste ekle
import React, { useState } from 'react';
import STLViewer from '../components/STLViewer';

export default function Home() {
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Dosyayı tarayıcı belleğinde geçici bir linke dönüştürüyoruz
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  return (
    <div className="p-10 font-sans">
      <h1 className="text-2xl font-bold mb-5">3D Baskı Sipariş Paneli</h1>
      
      <div className="mb-8">
        <label className="block mb-2 font-medium">STL Dosyanızı Yükleyin:</label>
        <input 
          type="file" 
          accept=".stl" 
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {fileUrl && (
        <div>
          <h2 className="text-xl mb-3">Model Önizleme</h2>
          <STLViewer url={fileUrl} />
          <p className="mt-2 text-sm text-gray-600 italic">
            * Mouse ile döndürebilir, tekerlek ile yakınlaştırabilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
}