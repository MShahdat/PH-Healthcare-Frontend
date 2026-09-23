"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Loader2 } from "lucide-react";
import type { Doctor, IDoctorReview, ReviewStatus } from "@/types";
import { useDoctorReview } from "@/hooks";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

function fileNameFromUrl(url: string) {
  try {
    return decodeURIComponent(url.split("/").pop() ?? url);
  } catch {
    return url;
  }
}

export function ApprovalModal({ doctor }: { doctor: Doctor }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"review" | "reject">("review");
  const [rejectionReason, setRejectionReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function reset() {
    setMode("review");
    setRejectionReason("");
    setSubmitting(false);
  }

  const documents = [
    {
      name: fileNameFromUrl(doctor.resume),
      url: doctor.resume,
      label: "Resume",
    },
    ...(doctor.additionalFiles
      ? doctor.additionalFiles.map((file) => ({
          name: fileNameFromUrl(file.url),
          url: file.url,
          label: "Supporting document",
        }))
      : []),
  ];

  const { mutate, isPending } = useDoctorReview();

  const handleAction = (status: ReviewStatus) => {
    const reviewData: IDoctorReview = {
      email: doctor.email,
      verificationStatus: status,
      rejectionReason,
    };
    console.log(reviewData);
    mutate(reviewData, {
      onSuccess: (res) => {
        toast.success(res.message);
        reset();
        setOpen(!open);
      },
      onError: (er) => {
        toast.error(er.message);
        return;
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger
        render={
          <Button size={"sm"} variant="outline">
            Review
          </Button>
        }
      />
      <DialogContent className="max-h-[calc(100dvh-2rem)] min-w-0 overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-lg">{doctor.name}</DialogTitle>
              <DialogDescription>{doctor.email}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {mode === "review" && (
          <div className="space-y-5 py-2">
            <section>
              <h4 className="text-xs font-medium text-muted-foreground mb-3">
                Professional details
              </h4>
              <dl className="grid grid-cols-[140px_1fr] gap-y-2.5 text-sm">
                <dt className="text-muted-foreground">Specialization</dt>
                <dd className="font-medium">{doctor.specialization}</dd>

                <dt className="text-muted-foreground">Licence number</dt>
                <dd className="font-mono text-[13px]">
                  {doctor.licenceNumber}
                </dd>

                <dt className="text-muted-foreground">Qualifications</dt>
                <dd>{doctor.qualifications}</dd>

                <dt className="text-muted-foreground">Experience</dt>
                <dd>{doctor.experienceYears} years</dd>

                <dt className="text-muted-foreground">Consultation fee</dt>
                <dd>{doctor.consultationFee}</dd>

                {doctor.address && (
                  <>
                    <dt className="text-muted-foreground">Address</dt>
                    <dd>{doctor.address}</dd>
                  </>
                )}
              </dl>
            </section>

            {doctor.bio && (
              <>
                <Separator />
                <section>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">
                    Bio
                  </h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {doctor.bio}
                  </p>
                </section>
              </>
            )}

            <Separator />

            <section>
              <h4 className="text-xs font-medium text-muted-foreground mb-3">
                Submitted documents
              </h4>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <a
                    key={doc.name}
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-md border px-3 py-2.5 text-sm hover:bg-accent transition-colors"
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="flex flex-col min-w-0">
                        <span className="font-medium truncate">{doc.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {doc.label}
                        </span>
                      </span>
                    </span>
                    <span className="text-xs text-primary shrink-0">Open</span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        )}

        {mode === "reject" && (
          <div className="space-y-2 py-2">
            <Label htmlFor="rejectionReason">
              Reason for rejection{" "}
              <span className="text-destructive">— required</span>
            </Label>
            <Textarea
              id="rejectionReason"
              placeholder="e.g. Licence number could not be verified against the registry."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="min-h-25"
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Sent to the applicant by email.
            </p>
          </div>
        )}

        <DialogFooter>
          {mode === "review" ? (
            <>
              <DialogClose render={<Button variant="outline">Close</Button>} />
              <Button
                variant="destructive"
                onClick={() => setMode("reject")}
                disabled={submitting}
              >
                Reject
              </Button>
              <Button
                onClick={() => handleAction("APPROVED")}
                disabled={submitting}
              >
                {submitting && (
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                )}
                {isPending ? (
                  <>
                    <Spinner /> Approving
                  </>
                ) : (
                  "Approved"
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setMode("review")}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleAction("REJECTED")}
                disabled={submitting || !rejectionReason.trim()}
              >
                {submitting && (
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                )}
                {isPending ? (
                  <>
                    <Spinner /> Confirming
                  </>
                ) : (
                  "Confirm Rejected"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
