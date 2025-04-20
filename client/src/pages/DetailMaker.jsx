import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadBox from '../components/UploadBox';
import Footer from '../components/Footer';
import { supabase } from '../supabaseClient';

export default function DetailMaker() {
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [imgDescs, setImgDescs] = useState(['', '', '']);
  const [longDesc, setLongDesc] = useState('');
  const [userId, setUserId] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedModel, setSelectedModel] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [modelImageUrl, setModelImageUrl] = useState(null);

  const modelPrompts = {
    '모델 A': '30대 한국 남성, 마른 체형, 깔끔한 캐주얼 복장, 전신 촬영, 정면을 보고 서 있음, 흰색 스튜디오 배경, 패션 카탈로그 스타일',
    '모델 B': '30대 한국 남성, 평균 체형, 패션 룩북 스타일, 흰 배경, 자연광 조명, 무표정 정면, 쇼핑몰 모델 사진 스타일',
    '모델 C': '30대 한국 남성, 근육질 체형, 핏한 캐주얼 복장, 전신 촬영, 정면 모습, 흰색 배경, 상품 촬영 스타일'
  };
  
  
  
  

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data?.user?.id || null);
    });
  }, []);

  const autoFillText = () => {
    setTitle('AI가 추천한 상품 제목');
    setShortDesc('이 상품은 최신 트렌드에 맞춰 디자인된 아이템입니다.');
    setImgDescs(['전면 착용 이미지', '후면 디테일 강조', '소재와 핏 강조 이미지']);
    setLongDesc('이 제품은 프리미엄 원단으로 제작되어 착용감이 뛰어나며, 일상에서도 스타일리시하게 활용 가능합니다.');
  };

  const handleGenerateModelImage = async () => {
    if (!selectedModel) return alert('AI 모델을 선택해주세요!');
    const prompt = modelPrompts[selectedModel];

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/leonardo`, { prompt });

      const generatedImages = res.data?.images;
      if (generatedImages && generatedImages.length > 0) {
        const image = generatedImages[0].url;
        console.log('Leonardo 응답 이미지:', image);

        setModelImageUrl(image);
        autoFillText();
        alert('✅ 모델 이미지 생성 완료!');
      } else {
        console.log('Leonardo 응답 없음:', res.data);
        alert('❌ 이미지 생성에 실패했습니다.');
      }
    } catch (err) {
      console.error('Leonardo 이미지 생성 실패:', err.response?.data || err.message);
      alert('❌ 서버 오류로 이미지 생성 실패');
    }
  };

  const handleGenerateImage = async () => {
    if (!uploadedImage) return alert('이미지를 업로드해주세요!');
    if (!selectedModel) return alert('AI 모델을 선택해주세요!');
    const prompt = modelPrompts[selectedModel];

    try {
      const initRes = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/upload-url`, {
        extension: uploadedImage.name.split('.').pop()
      });
      const { url, fields, imageId } = initRes.data;

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('file', uploadedImage);
      await axios.post(url, formData);

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/generate-image`, {
        prompt,
        imageId
      });

      const imageUrl = res.data?.imageUrl;
      setGeneratedImageUrl(imageUrl);
      alert('✅ 이미지 생성 완료!');
    } catch (err) {
      console.error('❌ 이미지 생성 실패:', err.response?.data || err.message);
      alert('❌ 이미지 생성 실패');
    }
  };

  const handleSave = async () => {
    if (!userId) return alert('로그인 후 이용해주세요.');
    if (!selectedModel) return alert('AI 모델을 선택해주세요!');

    const { error } = await supabase.from('products').insert({
      user_id: userId,
      title,
      short_desc: shortDesc,
      img_descs: imgDescs,
      long_desc: longDesc,
      model: selectedModel,
      status: 'draft',
    });

    if (error) {
      alert(`❌ 저장 실패: ${error.message}`);
    } else {
      alert('✅ 저장 완료!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 font-sans">
      <div className="max-w-3xl mx-auto space-y-12 text-center">

        <h1 className="text-3xl font-extrabold text-pink-600 tracking-wide">📸 상세페이지 제작</h1>

        {/* AI 모델 선택 */}
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">🧍 AI 모델 선택</h2>
          <div className="flex justify-center gap-3">
            {Object.keys(modelPrompts).map((name) => (
              <button
                key={name}
                onClick={() => setSelectedModel(name)}
                className={`px-4 py-2 rounded-md border ${
                  selectedModel === name ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <button
            onClick={handleGenerateModelImage}
            className="bg-purple-600 text-white px-5 py-2 rounded-md shadow hover:bg-purple-700"
          >
            ➕ 모델 생성
          </button>

          {modelImageUrl && (
            <div className="pt-4">
              <img src={modelImageUrl} alt="모델" className="w-full max-w-md mx-auto rounded-lg border shadow" />
            </div>
          )}
        </div>

        {/* 상품 이미지 업로드 */}
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-pink-600">📤 상품 이미지 업로드</h2>
          <div className="flex justify-center">
            <UploadBox onImageUpload={(file) => setUploadedImage(file)} />
          </div>
          <p className="text-sm text-gray-500">또는 파일을 드래그 / 붙여넣기 / URL 입력</p>
          <button
            onClick={handleGenerateImage}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md shadow hover:bg-indigo-700"
          >
            🧵 피팅 이미지 생성
          </button>
        </div>

        {/* GPT 텍스트 자동 생성 */}
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-xl font-semibold text-yellow-600">💬 GPT로 텍스트 자동생성</h2>
          <button
            onClick={autoFillText}
            className="bg-yellow-400 text-white px-5 py-2 rounded-md shadow hover:bg-yellow-500"
          >
            ✨ 텍스트 생성
          </button>
        </div>

        {/* 텍스트 입력 카드 */}
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 text-center">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목"
            className="w-full px-4 py-2 border rounded-md text-center text-lg font-semibold" />
          <p className="text-sm text-gray-500">AI가 생성한 상품의 제목입니다.</p>

          <input value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} placeholder="간단 설명"
            className="w-full px-4 py-2 border rounded-md text-center" />
          <p className="text-sm text-gray-500">상품 특징을 한 줄로 요약합니다.</p>

          <input value={imgDescs[0]} onChange={(e) => setImgDescs(prev => { const newList = [...prev]; newList[0] = e.target.value; return newList; })}
            placeholder="이미지 설명 1" className="w-full px-4 py-2 border rounded-md text-center" />
          <p className="text-sm text-gray-500">첫 번째 이미지: 전면 착용 이미지 설명</p>

          {/* 피팅 이미지 중간 삽입 */}
          {generatedImageUrl && (
            <div className="pt-4">
              <img src={generatedImageUrl} alt="피팅 이미지" className="w-full max-w-2xl mx-auto rounded-lg border shadow-lg" />
              <p className="text-sm text-gray-500 mt-2">생성된 피팅 이미지입니다.</p>
            </div>
          )}

          <input value={imgDescs[1]} onChange={(e) => setImgDescs(prev => { const newList = [...prev]; newList[1] = e.target.value; return newList; })}
            placeholder="이미지 설명 2" className="w-full px-4 py-2 border rounded-md text-center" />
          <p className="text-sm text-gray-500">후면 디테일 강조 설명입니다.</p>

          <input value={imgDescs[2]} onChange={(e) => setImgDescs(prev => { const newList = [...prev]; newList[2] = e.target.value; return newList; })}
            placeholder="이미지 설명 3" className="w-full px-4 py-2 border rounded-md text-center" />
          <p className="text-sm text-gray-500">소재와 핏 강조 이미지 설명입니다.</p>

          <textarea value={longDesc} onChange={(e) => setLongDesc(e.target.value)} placeholder="상세 설명"
            rows={5} className="w-full px-4 py-2 border rounded-md text-center" />
          <p className="text-sm text-gray-500">소재, 착용감, 스타일링 팁 등을 자세히 작성하세요.</p>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-center gap-4">
          <button onClick={handleSave} className="bg-green-500 text-white px-6 py-3 rounded-md shadow hover:bg-green-600">저장</button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700">관리자 승인 요청</button>
        </div>

        <Footer />
      </div>
    </div>
  );
}
