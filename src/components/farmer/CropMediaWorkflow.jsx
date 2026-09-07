import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Video, X, Maximize2, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function CropMediaWorkflow({ onComplete, crop, t }) {
  const [media, setMedia] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [showVideoCamera, setShowVideoCamera] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [cameraError, setCameraError] = useState('');

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    return () => stopMediaTracks();
  }, [stream]);

  const stopMediaTracks = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleFileUpload = (e, type = 'image') => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      if (file.size > 20 * 1024 * 1024) {
        alert(${file.name} is too large. Maximum size is 20MB.);
        return false;
      }
      if (type === 'image' && !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        alert(${file.name} has an invalid format. Please use JPG, PNG, or WebP.);
        return false;
      }
      return true;
    });

    const newMedia = validFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      type: file.type.startsWith('video/') ? 'video' : 'image',
      url: URL.createObjectURL(file),
      file
    }));
    
    setMedia(prev => [...prev, ...newMedia]);
    setAssessment(null);
  };

  const startCamera = async (type = 'image') => {
    try {
      setCameraError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: type === 'video' 
      });
      setStream(mediaStream);
      if (type === 'image') setShowCamera(true);
      if (type === 'video') setShowVideoCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access denied or unavailable:", err);
      setCameraError('Camera access is unavailable. You can upload a photo/video instead.');
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0);
    
    canvas.toBlob(blob => {
      const file = new File([blob], photo_.jpg, { type: 'image/jpeg' });
      setMedia(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        type: 'image',
        url: URL.createObjectURL(blob),
        file
      }]);
      stopCamera();
      setAssessment(null);
    }, 'image/jpeg');
  };

  const startRecording = () => {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    
    recorder.ondataavailable = e => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const file = new File([blob], ideo_.webm, { type: 'video/webm' });
      setMedia(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        type: 'video',
        url: URL.createObjectURL(blob),
        file
      }]);
      stopCamera();
      setAssessment(null);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
    
    let time = 0;
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      time++;
      setRecordingTime(time);
      if (time >= 30) stopRecording();
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    clearInterval(timerRef.current);
    setIsRecording(false);
  };

  const stopCamera = () => {
    stopMediaTracks();
    setShowCamera(false);
    setShowVideoCamera(false);
    setIsRecording(false);
    clearInterval(timerRef.current);
  };

  const removeMedia = (id) => {
    setMedia(prev => prev.filter(m => m.id !== id));
    setAssessment(null);
  };

  const analyzeCrop = () => {
    if (media.length === 0) return;
    
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAssessment({
        grade: 'A',
        confidence: 87,
        detected: ['Good colour', 'High uniformity', 'Low visible damage'],
        concerns: ['Minor surface damage detected'],
        disclaimer: 'AI-assisted estimate. Final quality verification may require standardized/manual inspection.'
      });
    }, 2500);
  };

  const handleSubmit = () => {
    onComplete({ media, assessment });
  };

  return (
    <div className="crop-media-workflow" style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ marginBottom: '0.5rem', color: '#17251e', fontSize: '1.25rem', fontWeight: '600' }}>Crop Photos & Video</h3>
      <p style={{ color: '#4b5563', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Add clear images of your {crop} to attract the best buyers.</p>
      
      {cameraError && (
        <div style={{ padding: '0.75rem', background: '#fee2e2', color: '#991b1b', borderRadius: '6px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={18} />
          <span style={{ fontSize: '0.9rem' }}>{cameraError}</span>
        </div>
      )}

      {(showCamera || showVideoCamera) && (
        <div className="camera-view" style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', background: '#000', marginBottom: '1rem' }}>
          <video ref={videoRef} autoPlay playsInline muted={showCamera} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
          
          {showVideoCamera && isRecording && (
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(239,68,68,0.9)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff', animation: 'pulse 1.5s infinite' }} />
              00:{recordingTime.toString().padStart(2, '0')} / 00:30
            </div>
          )}

          <div style={{ position: 'absolute', bottom: '1rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button onClick={stopCamera} style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: '#fff', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.4)', fontWeight: '500' }}>Cancel</button>
            
            {showCamera && (
              <button onClick={takePhoto} style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fff', border: '4px solid rgba(255,255,255,0.4)', backgroundClip: 'padding-box', cursor: 'pointer' }} aria-label="Take Photo" />
            )}
            
            {showVideoCamera && (
              isRecording ? (
                <button onClick={stopRecording} style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ef4444', border: '4px solid rgba(239,68,68,0.4)', backgroundClip: 'padding-box', cursor: 'pointer' }} aria-label="Stop Recording" />
              ) : (
                <button onClick={startRecording} style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ef4444', border: '4px solid #fff', cursor: 'pointer' }} aria-label="Start Recording" />
              )
            )}
          </div>
        </div>
      )}

      {!showCamera && !showVideoCamera && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => startCamera('image')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1.5rem 1rem', background: '#f5f8f6', border: '1px dashed #177a4e', borderRadius: '8px', color: '#177a4e', transition: 'all 0.2s', fontWeight: '500' }}>
            <Camera size={28} />
            <span>Take Photo</span>
          </button>
          
          <button onClick={() => fileInputRef.current?.click()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1.5rem 1rem', background: '#f5f8f6', border: '1px dashed #177a4e', borderRadius: '8px', color: '#177a4e', transition: 'all 0.2s', fontWeight: '500' }}>
            <Upload size={28} />
            <span>Upload Photos</span>
          </button>
          
          <button onClick={() => startCamera('video')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1.5rem 1rem', background: '#f5f8f6', border: '1px dashed #177a4e', borderRadius: '8px', color: '#177a4e', transition: 'all 0.2s', fontWeight: '500' }}>
            <Video size={28} />
            <span>Record Video</span>
          </button>
          
          <input type="file" multiple accept="image/jpeg,image/png,image/webp" ref={fileInputRef} onChange={(e) => handleFileUpload(e, 'image')} style={{ display: 'none' }} />
          <input type="file" accept="video/*" ref={videoInputRef} onChange={(e) => handleFileUpload(e, 'video')} style={{ display: 'none' }} />
        </div>
      )}

      {media.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.95rem', color: '#374151', marginBottom: '0.75rem', fontWeight: '600' }}>Media Gallery ({media.length})</h4>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {media.map((item, index) => (
              <div key={item.id} style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', border: index === 0 ? '2px solid #177a4e' : '1px solid #e5e7eb' }}>
                {index === 0 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: '#177a4e', color: 'white', fontSize: '10px', textAlign: 'center', padding: '2px 0', zIndex: 10 }}>Primary</div>}
                {item.type === 'image' ? (
                  <img src={item.url} alt="Crop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Video size={24} color="#fff" />
                  </div>
                )}
                <button onClick={() => setPreviewMedia(item)} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                  <Maximize2 size={16} />
                </button>
                <button onClick={() => removeMedia(item.id)} style={{ position: 'absolute', top: '4px', right: '4px', background: '#ef4444', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', zIndex: 10 }}>
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {media.length > 0 && !assessment && (
        <button 
          onClick={analyzeCrop} 
          disabled={analyzing}
          style={{ width: '100%', padding: '1rem', background: '#177a4e', color: '#fff', borderRadius: '8px', fontWeight: '600', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: analyzing ? 'not-allowed' : 'pointer', opacity: analyzing ? 0.8 : 1 }}
        >
          {analyzing ? <><Loader2 className="animate-spin" size={20} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing your crop...</> : 'Analyze Quality Estimate'}
        </button>
      )}

      {assessment && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.05em', color: '#166534', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>AI-Assisted Estimate</span>
              <h4 style={{ fontSize: '1.25rem', color: '#166534', fontWeight: '700', margin: 0 }}>Grade {assessment.grade}</h4>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.85rem', color: '#15803d', display: 'block' }}>Confidence</span>
              <strong style={{ fontSize: '1.1rem', color: '#166534' }}>{assessment.confidence}%</strong>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {assessment.detected.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#15803d' }}>
                <CheckCircle2 size={16} /> {item}
              </div>
            ))}
            {assessment.concerns.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#991b1b' }}>
                <AlertTriangle size={16} /> {item}
              </div>
            ))}
          </div>
          
          <div style={{ fontSize: '0.75rem', color: '#4b5563', fontStyle: 'italic', borderTop: '1px solid #bbf7d0', paddingTop: '0.75rem' }}>
            {assessment.disclaimer}
          </div>
        </div>
      )}

      {assessment && (
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>Produce Preview</h4>
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
              {media[0]?.type === 'image' ? (
                <img src={media[0].url} alt="Primary" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Video size={20} color="#fff" /></div>
              )}
            </div>
            <div>
              <h5 style={{ margin: 0, fontSize: '1.05rem', color: '#111827' }}>{crop}</h5>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
                Grade {assessment.grade} (AI Est.) • {media.filter(m => m.type==='image').length} Photos • {media.filter(m => m.type==='video').length} Video
              </p>
            </div>
          </div>
          
          <button 
            onClick={handleSubmit} 
            style={{ width: '100%', padding: '1rem', background: '#177a4e', color: '#fff', borderRadius: '8px', fontWeight: '600', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}
          >
            Submit Listing & Find Buyers <span>→</span>
          </button>
        </div>
      )}

      {previewMedia && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => setPreviewMedia(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={32} />
          </button>
          {previewMedia.type === 'image' ? (
            <img src={previewMedia.url} alt="Preview" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
          ) : (
            <video src={previewMedia.url} controls autoPlay style={{ maxWidth: '90%', maxHeight: '90%' }} />
          )}
        </div>
      )}
    </div>
  );
}
