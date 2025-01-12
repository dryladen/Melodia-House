import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Payment } from "@/types";
import { Calendar, DollarSign } from "lucide-react";
import React from "react";

export default function PaymentList({ payments }: { payments: Payment[] }) {
  return (
    <Card className="flex flex-col grow">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="payments">
          <CardHeader>
            <AccordionTrigger>
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold">Payments</h2>
              </div>
            </AccordionTrigger>
            <Separator />
          </CardHeader>
          <AccordionContent>
            <CardContent>
              <ul className="flex flex-col gap-4">
                {[...payments].reverse().map((payment) => (
                  <li
                    key={payment.id}
                    className="flex flex-col gap-2 border rounded-md p-4"
                  >
                    <div className="flex gap-2 items-center text-sm">
                      <Calendar size={16} />
                      <span className="font-bold hidden md:block">Date:</span>
                      <span>
                        {new Date(payment.payment_date).toLocaleString(
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
                    <div className="flex gap-2 text-sm items-center">
                      <DollarSign size={16} />
                      <span className="font-bold hidden md:block">Rate:</span>
                      <h3>
                        {payment.currency} {payment.rate}
                      </h3>
                    </div>
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
