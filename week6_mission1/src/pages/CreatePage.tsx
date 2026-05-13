import { useState, useRef } from 'react';
import { useUploadImage, useCreateLP } from '../hooks/lp';

interface CreatePageProps {
  onClose: () => void;
}

const CreatePage = ({ onClose }: CreatePageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const uploadMutation = useUploadImage();
  const createLPMutation = useCreateLP();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadMutation.mutateAsync(file);
        setThumbnail(imageUrl);
      } catch (error) {
        alert('이미지 업로드에 실패했습니다.');
      }
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (targetTag: string) => {
    setTags(tags.filter(tag => tag !== targetTag));
  };

  const handleSubmit = () => {
    if (!formData.title || !thumbnail) {
      alert('제목과 이미지는 필수입니다.');
      return;
    }

    createLPMutation.mutate({
      ...formData,
      thumbnail,
      tags,
      published: true
    }, {
      onSuccess: () => {
        alert('LP가 성공적으로 등록되었습니다!');
        onClose();
      }
    });
  };

  return (
    <div style={{
      width: '450px', backgroundColor: '#1e1e26', borderRadius: '15px',
      padding: '30px', color: '#fff', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
    }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
      
      <h2 style={{ textAlign: 'center', marginBottom: '25px', fontWeight: 'bold' }}>새로운 LP 등록</h2>

      <div 
        onClick={() => fileInputRef.current?.click()}
        style={{
          width: '100%', aspectRatio: '1/1', backgroundColor: '#2d2d3a',
          borderRadius: '10px', display: 'flex', justifyContent: 'center',
          alignItems: 'center', cursor: 'pointer', marginBottom: '20px',
          overflow: 'hidden', border: '2px dashed #444'
        }}
      >
        {thumbnail ? (
          <img src={thumbnail} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ textAlign: 'center', color: '#888' }}>
            <span style={{ fontSize: '40px' }}>+</span>
            <p style={{ fontSize: '13px' }}>사진 업로드</p>
          </div>
        )}
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />

      <input 
        placeholder="LP 제목을 입력하세요"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#2d2d3a', color: '#fff', outline: 'none' }}
      />
      <textarea 
        placeholder="LP에 대한 설명을 적어주세요"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        style={{ width: '100%', padding: '12px', height: '100px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#2d2d3a', color: '#fff', outline: 'none', resize: 'none' }}
      />

      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <input 
          placeholder="태그 입력 (Enter)"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#2d2d3a', color: '#fff', outline: 'none' }}
        />
        <button onClick={handleAddTag} style={{ padding: '0 15px', borderRadius: '8px', backgroundColor: '#e91e63', color: '#fff', border: 'none', cursor: 'pointer' }}>추가</button>
      </div>

      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '25px', minHeight: '30px' }}>
        {tags.map(tag => (
          <span key={tag} style={{ backgroundColor: '#444', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            #{tag} <span onClick={() => handleRemoveTag(tag)} style={{ cursor: 'pointer', color: '#e91e63', fontWeight: 'bold' }}>✕</span>
          </span>
        ))}
      </div>

      <button 
        onClick={handleSubmit}
        disabled={createLPMutation.isPending || uploadMutation.isPending}
        style={{ width: '100%', padding: '15px', borderRadius: '8px', backgroundColor: '#e91e63', color: '#fff', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', opacity: (createLPMutation.isPending || uploadMutation.isPending) ? 0.7 : 1 }}
      >
        {createLPMutation.isPending ? '등록 중...' : uploadMutation.isPending ? '이미지 업로드 중...' : 'LP 등록하기'}
      </button>
    </div>
  );
};

export default CreatePage;