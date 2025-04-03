"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Ghost, LoaderCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { chatSession } from '@/utils/GeminiAIModel'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import moment from 'moment';


  

  

function AddNewInterview() {
    const [openDialog,setOpenDialog]=useState(false)
    const [jobPosition,setJobPosition] = useState()
    const [jobDescription,setJobDescription] = useState()
    const [jobExperience,setJobExperience] = useState()
    const [jobCompany,setJobCompany] = useState()
    const [jobSalary,setJobSalary] = useState()
    const Router = useRouter();

    //for loading
    const [loading,setLoading] = useState(false)

    //for db storage
    const [jsonMockResponse,setJsonResponse] = useState([]);

    const onSubmitClick = async(e) => {
      setLoading(true)
      e.preventDefault()
      console.log(jobPosition,jobDescription,jobExperience,jobCompany,jobSalary)

      const inputGeminiPrompt = "Job Position: "+jobPosition+", Job Description: "+jobDescription+", Years of Experience: "+jobExperience+", Target Company: "+jobCompany+", Target Salary(in Rs.): "+jobSalary+" \nDepending on the information generate 5 questions and answers for an interview in JSON Format.Give Question and answer as field in JSON."

      const outputGeminiPrompt = await chatSession.sendMessage(inputGeminiPrompt);

      const mockJSONResponse = (outputGeminiPrompt.response.text()).replace('```json','').replace('```','')

      console.log(JSON.parse(mockJSONResponse))
      setJsonResponse(mockJSONResponse)
      if(mockJSONResponse){
        const dbResp = await db.insert(MockInterview)
        .values({
            mockId:uuidv4(),
            jobCompany:jobCompany,
            jobDesc:jobDescription,
            jobExperience:jobExperience,
            jobPosition:jobPosition,
            jsonMockResp:mockJSONResponse,
            createdBy:"from authentication",
            createdAt:moment().format('DD-MM-yyyy')
        }).returning({mockId:MockInterview.mockId})

        console.log("Inserted id",dbResp);
        if(dbResp)
        {
            setOpenDialog(false)
            Router.push('/dashboard/interview/'+dbResp[0]?.mockId)
        }

      }
      else{
        console.log("Error in simulating interview")
      }

      setLoading(false)
      if(dbResp) setOpenDialog(false)
    }

  return (
    <div>
        <div className='bg-purple-50 p-10 border rounded-lg  hover:scale-105 hover:shadow cursor-pointer transition-all'
        onClick={()=>setOpenDialog(true)}>
            <h2 className='font-bold text-lg text-center text-purple-700'>+ Start your Mockup Interview</h2>
        </div>
        <Dialog open={openDialog}>
  <DialogContent className="bg-purple-100 max-w-xl">
    <DialogHeader>
      <DialogTitle className="text-2xl text-purple-700">Tell us more about your Interview</DialogTitle>
      <DialogDescription>

        <form onSubmit={onSubmitClick}>
        <div>
            <h2 className='font-bold text-xl  text-purple-600'>Add Details about your Job</h2>
            <div className='mt-7 my-2'>
                <label className='font-bold  text-purple-700'>Job Position</label>
                <Input placeholder="Ex: Full Stack Developer " className="mt-1  text-purple-600" required 
                  onChange = {(e)=>setJobPosition(e.target.value)}
                />
            </div>
            <div className='mt-7 my-2'>
                <label className='font-bold  text-purple-700' >Job Description or Your Tech Stack (In Short)</label>
                <Textarea placeholder="Ex: React, Nextjs, MongoDB etc" className="mt-1 text-purple-600" required 
                  onChange = {(e)=>setJobDescription(e.target.value)}
                />
            </div>
            <div className='mt-7 my-2  text-purple-700'>
                <label className='font-bold  text-purple-600'>Experience:</label>
                <Select required 
                  onValueChange = {(e)=>setJobExperience(e)}
                >
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
        <label className='w-full mt-2 font-bold  text-purple-700'>Expected Salary (per annum):</label>
                <Input placeholder="Expected Salary " className="w-full mt-2  text-purple-600" type="number" required
                onChange = {(e)=>setJobSalary(e.target.value)}
                />
            </div>
            <div className='mt-7 my-2  text-purple-700'>
                <label className='font-bold  text-purple-600'>Company:</label>
                <Select required
                  onValueChange = {(value)=>setJobCompany(value)}
                >
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
        <div className="items-top flex space-x-2  text-purple-700">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none  text-purple-700">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
        >
          Accept terms and conditions
        </label>
      </div>
    </div>
        <div className='flex gap-5 justify-end  text-purple-700'>
            <Button type="button" onClick={()=>setOpenDialog(false) }>Cancel</Button>
            <Button type="submit" disabled={loading==true} >
              {loading?
              <>
              <LoaderCircle className='animate-spin'/>Simulating Your Interview
              </>:'Start Interview'  
            }
              </Button>
        </div>
        </form>
        
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
    
  )
}

export default AddNewInterview