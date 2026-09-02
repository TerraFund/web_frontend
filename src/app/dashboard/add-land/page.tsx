'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  FileText,
  Sprout,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Upload,
  ShieldCheck,
  DollarSign,
  Info,
  Loader2,
  Check,
  AlertCircle,
  FileCheck,
  Compass,
} from 'lucide-react';
import Button from '@/components/Button';

export default function AddLandWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    region: 'Southern Province',
    location: '',
    coordinates: '-1.9441, 30.0619',
    elevation: '1750',
    soilType: 'Volcanic Clay Loam',
    soilPh: '6.4',
    waterSource: 'River & Borehole',
    irrigationType: 'Drip System',
    annualPrice: '15000',
    description: '',
    documentsUploaded: false,
    uploadedDocNames: [] as string[],
  });

  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const steps = [
    { id: 1, title: 'Land Details', subtitle: 'Location & GIS Coordinates', icon: MapPin },
    { id: 2, title: 'Soil & Agronomy', subtitle: 'Water, pH & AI Yield Insights', icon: Sprout },
    { id: 3, title: 'Ownership Documents', subtitle: 'Title Deed & UPI Verification', icon: FileText },
    { id: 4, title: 'Pricing & Publish', subtitle: 'Lease Terms & Final Review', icon: DollarSign },
  ];

  // AI Recommendation simulation
  const generateAiRecommendations = useCallback(() => {
    setIsAiLoading(true);
    setTimeout(() => {
      const ph = parseFloat(formData.soilPh) || 6.5;
      const sizeVal = parseFloat(formData.size) || 20;

      const recs = [
        `Soil pH ${ph}: High suitability for Hass Avocado, Speciality Arabica Coffee, and French Beans.`,
        `Water source (${formData.waterSource}): Recommended setup is ${formData.irrigationType} to increase water efficiency by 35%.`,
        `Land area (${sizeVal} Hectares): Ideal for multi-crop commercial leasing, estimated yield: $${Math.round(sizeVal * 850)}/yr per hectare.`,
        `Elevation (${formData.elevation}m): Protected against extreme heat stress, excellent micro-climate rating.`,
      ];
      setAiRecommendations(recs);
      setIsAiLoading(false);
    }, 800);
  }, [formData.soilPh, formData.size, formData.waterSource, formData.irrigationType, formData.elevation]);

  useEffect(() => {
    if (currentStep === 2) {
      generateAiRecommendations();
    }
  }, [currentStep, generateAiRecommendations]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map(f => f.name);
      setFormData(prev => ({
        ...prev,
        documentsUploaded: true,
        uploadedDocNames: [...prev.uploadedDocNames, ...names],
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/lands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedSuccess(true);
        setTimeout(() => {
          router.push('/dashboard/my-lands');
        }, 1800);
      }
    } catch (err) {
      console.error('Failed to publish land:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" /> Landowner Portal
            </div>
            <h1 className="text-3xl font-bold tracking-tight">List New Agricultural Land</h1>
            <p className="text-muted-foreground text-sm">
              List your plot to connect with verified investors and secure structured lease contracts.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/my-lands')}
            className="self-start md:self-auto"
          >
            Cancel & Return
          </Button>
        </div>

        {/* Stepper Progress Header */}
        <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = currentStep === s.id;
              const isCompleted = currentStep > s.id;

              return (
                <div
                  key={s.id}
                  onClick={() => isCompleted && setCurrentStep(s.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary/10 border border-primary/30'
                      : isCompleted
                      ? 'bg-emerald-500/5 hover:bg-emerald-500/10'
                      : 'opacity-50'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                      isActive
                        ? 'bg-primary text-white shadow-md shadow-primary/30'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div className="hidden sm:block overflow-hidden">
                    <p className={`text-xs font-bold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {s.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">{s.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Line */}
          <div className="w-full bg-muted h-1.5 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 ease-out rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Wizard Body */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-md">
          {submittedSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Land Listing Published!</h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Your plot has been successfully created and submitted for verification audit. Redirecting to your portfolio dashboard...
              </p>
              <div className="flex justify-center pt-4">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: LAND DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="border-b border-border pb-4">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" /> Step 1: Basic Land Information & GIS Location
                    </h3>
                    <p className="text-xs text-muted-foreground">Provide plot name, acreage size, and location coordinates.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Land / Property Title *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Kagera Valley Coffee & Avocado Estate"
                        className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Total Area Size (Hectares) *
                      </label>
                      <input
                        type="number"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        placeholder="e.g. 35.5"
                        className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Province / Region *
                      </label>
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        <option value="Southern Province">Southern Province</option>
                        <option value="Northern Province">Northern Province</option>
                        <option value="Eastern Province">Eastern Province</option>
                        <option value="Western Province">Western Province</option>
                        <option value="Kigali City">Kigali City Outer Belt</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Specific District / Village Address
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Huye District, Mukura Sector"
                        className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        GIS GPS Coordinates (Lat, Long)
                      </label>
                      <input
                        type="text"
                        value={formData.coordinates}
                        onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                        placeholder="-1.9441, 30.0619"
                        className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none font-mono text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Elevation Above Sea Level (Meters)
                      </label>
                      <input
                        type="number"
                        value={formData.elevation}
                        onChange={(e) => setFormData({ ...formData, elevation: e.target.value })}
                        placeholder="1750"
                        className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SOIL & AGRONOMY */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="border-b border-border pb-4">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Sprout className="w-5 h-5 text-emerald-500" /> Step 2: Soil Profile & Water Infrastructure
                    </h3>
                    <p className="text-xs text-muted-foreground">Specify soil chemistry and irrigation setup for automated AI crop recommendations.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Soil Composition / Type
                      </label>
                      <select
                        value={formData.soilType}
                        onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                        className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        <option value="Volcanic Clay Loam">Volcanic Clay Loam (Rich Organic)</option>
                        <option value="Sandy Loam">Sandy Loam (Good Drainage)</option>
                        <option value="Alluvial Silt Loam">Alluvial Silt Loam (River Valley)</option>
                        <option value="Red Clay Soil">Red Clay Soil (High Iron/Aluminium)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Soil pH Level (4.0 - 8.5)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.soilPh}
                        onChange={(e) => setFormData({ ...formData, soilPh: e.target.value })}
                        placeholder="6.4"
                        className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Primary Water Source
                      </label>
                      <input
                        type="text"
                        value={formData.waterSource}
                        onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                        placeholder="e.g. River Canal & Perennial Spring"
                        className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Irrigation Infrastructure
                      </label>
                      <input
                        type="text"
                        value={formData.irrigationType}
                        onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                        placeholder="e.g. Drip Irrigation & Solar Pumping"
                        className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* AI Crop Recommendation Card */}
                  <div className="bg-gradient-to-br from-primary/10 via-emerald-500/5 to-card border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                      <h4 className="font-bold text-sm text-foreground">AI Agronomy & Crop Suitability Advisor</h4>
                    </div>

                    {isAiLoading ? (
                      <div className="flex items-center gap-3 py-4 text-xs text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" /> Analyzing soil pH, elevation, and region parameters...
                      </div>
                    ) : (
                      <ul className="space-y-2 text-xs">
                        {aiRecommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: DOCUMENTS & TITLE DEED */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="border-b border-border pb-4">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-500" /> Step 3: Land Ownership Verification Documents
                    </h3>
                    <p className="text-xs text-muted-foreground">Upload official Title Deeds, UPI certificates, or Agronomist Soil Reports.</p>
                  </div>

                  <div className="border-2 border-dashed border-border hover:border-primary/50 bg-muted/20 rounded-2xl p-8 text-center transition-all">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <h4 className="font-bold text-sm text-foreground">Upload Ownership Certificates (PDF or High-Res Image)</h4>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
                      Drag & drop your Land Title Deed, UPI Document, or Soil Test Report (Max size: 15MB per file).
                    </p>

                    <input
                      type="file"
                      id="doc-upload"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="doc-upload"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold text-xs rounded-xl cursor-pointer hover:bg-primary/90 transition-all shadow-md"
                    >
                      <Upload className="w-4 h-4" /> Browse Files
                    </label>
                  </div>

                  {formData.uploadedDocNames.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wider">Uploaded Documents ({formData.uploadedDocNames.length})</p>
                      <div className="space-y-2">
                        {formData.uploadedDocNames.map((name, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-muted/40 border border-border rounded-xl text-xs">
                            <div className="flex items-center gap-2">
                              <FileCheck className="w-4 h-4 text-emerald-500" />
                              <span className="font-medium text-foreground">{name}</span>
                            </div>
                            <span className="text-[11px] text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">Ready</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-3 text-xs text-blue-400">
                    <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">AES-256 Encrypted Verification</p>
                      <p className="text-muted-foreground mt-0.5">Your ownership documents are encrypted and only accessible by authorized land verification auditors.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: PRICING & FINAL REVIEW */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="border-b border-border pb-4">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-amber-500" /> Step 4: Lease Pricing & Final Review
                    </h3>
                    <p className="text-xs text-muted-foreground">Set your expected annual lease price and review listing summary before publishing.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Desired Annual Lease Price (USD $) *
                      </label>
                      <div className="relative">
                        <DollarSign className="w-5 h-5 absolute left-3 top-3 text-muted-foreground" />
                        <input
                          type="number"
                          value={formData.annualPrice}
                          onChange={(e) => setFormData({ ...formData, annualPrice: e.target.value })}
                          placeholder="15000"
                          className="w-full pl-10 pr-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none font-bold text-foreground"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Est. Rate per Hectare
                      </label>
                      <div className="p-3 bg-muted/40 border border-border rounded-xl text-sm font-bold text-primary flex items-center justify-between">
                        <span>Calculated Rate:</span>
                        <span>
                          ${formData.size ? Math.round(parseFloat(formData.annualPrice || '0') / parseFloat(formData.size)) : 0} / ha / yr
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Public Property Description
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Highlight special advantages, road access, distance from main market centers, and historical crop yields..."
                      className="w-full px-4 py-3 bg-muted/40 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                    />
                  </div>

                  {/* Listing Summary Card */}
                  <div className="p-5 bg-card border border-border rounded-2xl space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Listing Summary Preview</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground block">Title:</span>
                        <span className="font-bold text-foreground">{formData.name || 'Untitled Plot'}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Size:</span>
                        <span className="font-bold text-foreground">{formData.size || '0'} Hectares</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Region:</span>
                        <span className="font-bold text-foreground">{formData.region}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Soil pH:</span>
                        <span className="font-bold text-foreground">{formData.soilPh} ({formData.soilType})</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1 || submitting}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </Button>

                {currentStep < 4 ? (
                  <Button onClick={handleNext} className="flex items-center gap-2 shadow-md shadow-primary/20">
                    Next Step <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting Listing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Publish Land Listing
                      </>
                    )}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}