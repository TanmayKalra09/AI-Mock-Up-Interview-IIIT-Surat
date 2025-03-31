"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      {/* Start your Mockup Interview Button */}
      <div
        className="bg-purple-50 p-10 border rounded-lg hover:scale-105 hover:shadow cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center text-purple-700">
          + Start your Mockup Interview
        </h2>
      </div>

      {/* Dialog Box */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-purple-100 max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-purple-700">
              Tell us more about your Interview
            </DialogTitle>
            <DialogDescription>
              {/* Job Position */}
              <div>
                <h2 className="font-bold text-xl text-purple-600">
                  Add Details about your Job
                </h2>
                <div className="mt-7 my-2">
                  <label className="font-bold text-purple-700">Job Position</label>
                  <Input
                    placeholder="Ex: Full Stack Developer"
                    className="mt-1 text-purple-600"
                  />
                </div>

                {/* Job Description or Tech Stack */}
                <div className="mt-7 my-2">
                  <label className="font-bold text-purple-700">
                    Job Description or Your Tech Stack (In Short)
                  </label>
                  <Textarea
                    placeholder="Ex: React, Nextjs, MongoDB etc"
                    className="mt-1 text-purple-600"
                  />
                </div>

                {/* Experience */}
                <div className="mt-7 my-2 text-purple-700">
                  <label className="font-bold text-purple-600">Experience:</label>
                  <Select>
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

                {/* Expected Salary */}
                <div>
                  <label className="w-full mt-2 font-bold text-purple-700">
                    Expected Salary (per annum):
                  </label>
                  <Input
                    placeholder="Expected Salary"
                    className="w-full mt-2 text-purple-600"
                    type="number"
                  />
                </div>

                {/* Company */}
                <div className="mt-7 my-2 text-purple-700">
                  <label className="font-bold text-purple-600">Company:</label>
                  <Select>
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

              {/* Terms and Conditions Checkbox */}
              <div className="items-top flex space-x-2 text-purple-700">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none text-purple-700">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
              </div>

              {/* Cancel and Submit Buttons */}
              <div className="flex gap-5 justify-end text-purple-700">
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button>Submit</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
