'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, MapPin, FileText, Sprout, Check, Sparkles, Loader2 } from 'lucide-react';
import Map from '@/components/Map';

export default function AddLandWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    coordinates: '',
    region: '',
    soilType: '',
    elevation: '',
    waterSource: '',
    recommendedCrops: '',
    irrigationType: '',
    rainfall: '',
    soilPh: '',
    fertilityIndex: '',
  });

  const steps = [
    { id: 1, title: 'Land Details', icon: MapPin },
    { id: 2, title: 'Documents', icon: FileText },
    { id: 3, title: 'Crop & Water', icon: Sprout },
    { id: 4, title: 'Review & Publish', icon: Check },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Mock submission with confetti
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      router.push('/dashboard');
    }, 2000);
  };

  const getAIRecommendations = async () => {
    if (!formData.region || !formData.soilType || !formData.size) return;

    setIsLoadingAI(true);
    // Mock AI API call - in real app this would call your AI service
    setTimeout(() => {
      const recommendations = [
        `Based on ${formData.region} climate: Consider maize and beans for optimal yield`,
        `Soil pH ${formData.soilPh || 'unknown'} suggests ${formData.soilPh > 6.5 ? 'alkaline-tolerant' : 'acid-loving'} crops`,
        `With ${formData.size} acres: Recommended irrigation system - ${formData.irrigationType || 'drip irrigation'}`,
        `Elevation ${formData.elevation}m: Suitable for coffee and tea cultivation`
      ];
      setAiRecommendations(recommendations);
      setIsLoadingAI(false);
    }, 1500);
  };

  useEffect(() => {
    if (currentStep === 3) {
      getAIRecommendations();
    }
  }, [currentStep, formData.region, formData.soilType, formData.size]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Land Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Green Valley Farm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size (acres)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Coordinates
                </label>
                <input
                  type="text"
                  placeholder="-1.2864, 36.8172"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  value={formData.coordinates}
                  onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Region
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="e.g., Rift Valley"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Elevation (m)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  value={formData.elevation}
                  onChange={(e) => setFormData({ ...formData, elevation: e.target.value })}
                  placeholder="1500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location Preview
              </label>
              <div className="h-64 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                <Map
                  center={formData.coordinates ? formData.coordinates.split(',').map(c => parseFloat(c.trim())) as [number, number] : [-1.2864, 36.8172]}
                  zoom={12}
                  markers={formData.coordinates ? [{
                    id: 'land-location',
                    position: formData.coordinates.split(',').map(c => parseFloat(c.trim())) as [number, number],
                    title: formData.name || 'Land Location',
                    description: `${formData.size} acres in ${formData.region}`
                  }] : []}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upload ownership documents (Title deed, UPI document)
              </p>
              <input
                type="file"
                multiple
                className="hidden"
                id="document-upload"
              />
              <label
                htmlFor="document-upload"
                className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-accent transition-colors"
              >
                Select Files
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            {/* AI Recommendations */}
            {aiRecommendations.length > 0 && (
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center mb-3">
                  <Sparkles className="w-5 h-5 text-accent mr-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">AI Recommendations</h3>
                </div>
                <div className="space-y-2">
                  {aiRecommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300 animate-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Add New Land</h1>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {step.id < 4 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </button>
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors"
            >
              Publish Land
              <Check className="h-5 w-5 ml-2" />
            </button>
          )}
        </div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#0B6E4F', '#F4A261', '#1E3932'][Math.floor(Math.random() * 3)],
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}