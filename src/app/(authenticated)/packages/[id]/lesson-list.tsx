import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lesson } from "@/types";
import { BookOpenCheck, Calendar, NotebookText, Speech } from "lucide-react";
import React from "react";

export default function LessonList({ lessons }: { lessons: Lesson[] }) {
  return (
    <Card className="flex flex-col grow">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="lessons">
          <CardHeader>
            <AccordionTrigger>
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold">Lessons</h2>
              </div>
            </AccordionTrigger>
            <Separator />
          </CardHeader>
          <AccordionContent>
            <CardContent>
              <ul className="flex flex-col gap-4">
                {[...lessons].reverse().map((lesson) => (
                  <li
                    key={lesson.id}
                    className="flex flex-col gap-2 border rounded-md p-4"
                  >
                    <div className="flex gap-2 items-center text-sm">
                      <Calendar size={16} />
                      <span className="font-bold hidden md:block">Date:</span>
                      <span>
                        {new Date(lesson.start_datetime).toLocaleString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center text-sm">
                      <BookOpenCheck size={16} />
                      <span className="font-bold hidden md:block">Status:</span>
                      <span
                        className={`capitalize ${
                          lesson.status === "absent"
                            ? "text-red-600"
                            : lesson.status === "attended"
                            ? "text-green-600"
                            : ""
                        }`}
                      >
                        {lesson.status}
                      </span>
                    </div>
                    <div className="flex gap-2 text-sm items-center">
                      <Speech size={16} />
                      <span className="font-bold hidden md:block">
                        Teacher:
                      </span>
                      <h3>
                        {lesson.teacher.first_name} {lesson.teacher.last_name}
                      </h3>
                    </div>

                    {lesson.remarks && (
                      <div className="flex gap-2 items-center text-sm">
                        <NotebookText size={16} />
                        <span className="font-bold hidden md:block">
                          Remarks:
                        </span>
                        <span>{lesson.remarks}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
