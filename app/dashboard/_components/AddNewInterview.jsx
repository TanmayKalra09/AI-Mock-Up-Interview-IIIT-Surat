"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation";
import { Ghost } from 'lucide-react'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [formData, setFormData] = useState({
        jobPosition: "",
        jobDescription: "",
        experience: "",
        expectedSalary: "",
        company: "",
        termsAccepted: false
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = () => {
        setFormData(prev => ({ ...prev, termsAccepted: !prev.termsAccepted }));
    };

    const handleSubmit = () => {
      if (!formData.jobPosition || !formData.jobDescription || !formData.experience || !formData.company || !formData.termsAccepted) {
        alert("Please fill all fields and accept terms.");
        return;
    }
    const interviewId = Math.random().toString(36).substring(2, 10); 
    localStorage.setItem(`interview-${interviewId}`, JSON.stringify(formData));
        console.log("Form Submitted:", formData);
        console.log("Navigating to:", `/dashboard/interview/${interviewId}`);
        router.push(`/dashboard/interview/${interviewId}`);
        setFormData({
          jobPosition: "",
          jobDescription: "",
          experience: "",
          expectedSalary: "",
          company: "",
          termsAccepted: false
      });
        setOpenDialog(false);
    };

    return (
        <div>
            <div className='bg-purple-50 p-10 border rounded-lg hover:scale-105 hover:shadow cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h2 className='font-bold text-lg text-center text-purple-700'>+ Start your Mock Interview</h2>
            </div>
            
            <Dialog open={openDialog}>
                <DialogContent className="bg-purple-100 max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-purple-700">Tell us more about your Interview</DialogTitle>
                        <DialogDescription>
                            <div>
                                <div className='mt-7 my-2'>
                                    <label className='font-bold text-purple-700'>Job Position</label>
                                    <Input 
                                        name="jobPosition"
                                        value={formData.jobPosition}
                                        onChange={handleChange}
                                        placeholder="Ex: Full Stack Developer" 
                                        className="mt-1 text-purple-600"
                                    />
                                </div>
                                <div className='mt-7 my-2'>
                                    <label className='font-bold text-purple-700'>Job Description or Tech Stack</label>
                                    <Textarea 
                                        name="jobDescription"
                                        value={formData.jobDescription}
                                        onChange={handleChange}
                                        placeholder="Ex: React, Next.js, MongoDB" 
                                        className="mt-1 text-purple-600"
                                    />
                                </div>
                                <div className='mt-7 my-2 text-purple-700'>
                                    <label className='font-bold text-purple-600'>Experience</label>
                                    <Select onValueChange={(value) => handleSelectChange("experience", value)}>
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Experience in the Field..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">0</SelectItem>
                                            <SelectItem value="0-1">0-1</SelectItem>
                                            <SelectItem value="1-2">1-2</SelectItem>
                                            <SelectItem value="2-3">2-3</SelectItem>
                                            <SelectItem value="3-4">3-4</SelectItem>
                                            <SelectItem value="4-5">4-5</SelectItem>
                                            <SelectItem value="5+">5+</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className='w-full mt-2 font-bold text-purple-700'>Expected Salary (per annum)</label>
                                    <Input 
                                        name="expectedSalary"
                                        value={formData.expectedSalary}
                                        onChange={handleChange}
                                        placeholder="Expected Salary" 
                                        className="w-full mt-2 text-purple-600" 
                                        type="number"
                                    />
                                </div>
                                <div className='mt-7 my-2 text-purple-700'>
                                    <label className='font-bold text-purple-600'>Company</label>
                                    <Select onValueChange={(value) => handleSelectChange("company", value)}>
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Meta">Meta</SelectItem>
                                            <SelectItem value="Apple">Apple</SelectItem>
                                            <SelectItem value="Amazon">Amazon</SelectItem>
                                            <SelectItem value="Netflix">Netflix</SelectItem>
                                            <SelectItem value="Google">Google</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="items-top flex space-x-2 text-purple-700">
                                <Checkbox id="terms1" checked={formData.termsAccepted} onCheckedChange={handleCheckboxChange} />
                                <label htmlFor="terms1" className="text-sm font-medium">
                                    Accept terms and conditions
                                </label>
                            </div>
                            <div className='flex gap-5 justify-end text-purple-700'>
                                <Button variant={Ghost} onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button className="bg-purple-700 hover:bg-purple-600" onClick={handleSubmit}>Submit</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;