import { Converter } from "./converter";
import json2csv from "json-2-csv";

const options = {
  delimiter: {
    wrap: "",
    field: "",
    eol: "\n",
  },
  prependHeader: false,
  excelBOM: true,
};

export class Subtitle {
  constructor(private xmlResponse: string) {}

  public getVtt(filename: string): void {
    json2csv
      .json2csvAsync(new Converter(this.xmlResponse).toVtt(), options)
      .then((csv: string) => {
        chrome.downloads.download({
          url: URL.createObjectURL(new Blob(["WEBVTT\n\n" + csv], { type: "text/vtt" })),
          filename: filename + ".vtt",
        });
      })
      .catch((err: any) => {
        if (err) throw err;
      });
  }

  public getSrt(filename: string): void {
    json2csv
      .json2csvAsync(new Converter(this.xmlResponse).toSrt(), options)
      .then((csv: string) => {
        chrome.downloads.download({
          url: URL.createObjectURL(new Blob([csv], { type: "text/srt" })),
          filename: filename + ".srt",
        });
      })
      .catch((err: any) => {
        if (err) throw err;
      });
  }

  public getLrc(filename: string): void {
    json2csv
      .json2csvAsync(new Converter(this.xmlResponse).toLrc(), options)
      .then((csv: string) => {
        chrome.downloads.download({
          url: URL.createObjectURL(new Blob([csv], { type: "text/lrc" })),
          filename: filename + ".lrc",
        });
      })
      .catch((err: any) => {
        if (err) throw err;
      });
  }

  public getCsv(filename: string): void {
    json2csv
      .json2csvAsync(new Converter(this.xmlResponse).toCsv(), {
        excelBOM: true,
      })
      .then((csv: string) => {
        chrome.downloads.download({
          url: URL.createObjectURL(new Blob([csv], { type: "text/csv" })),
          filename: filename + ".csv",
        });
      })
      .catch((err: any) => {
        if (err) throw err;
      });
  }

  public getText(filename: string): void {
    json2csv
      .json2csvAsync(new Converter(this.xmlResponse).toText(), options)
      .then((csv: string) => {
        chrome.downloads.download({
          url: URL.createObjectURL(new Blob([csv], { type: "text/plane" })),
          filename: filename + ".txt",
        });
      })
      .catch((err: any) => {
        if (err) throw err;
      });
  }
}
