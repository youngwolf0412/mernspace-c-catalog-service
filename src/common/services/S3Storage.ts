import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import config from "config";
import { FileData, FileStorage } from "../types/storage";
import createHttpError from "http-errors";

export class S3Storage implements FileStorage {
    private client: S3Client;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.client = new S3Client({
            region: config.get("s3.region"),

            credentials: {
                accessKeyId: config.get("s3.accessKeyId"),
                secretAccessKey: config.get("s3.secretAccessKey"),
            },
        });
    }
    async upload(data: FileData): Promise<void> {
        const objectParams = {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            Bucket: config.get("s3.bucket") as string,
            Key: data.filename,

            Body: new Uint8Array(data.fileData),
        };
        // console.log("Uploading to S3", objectParams);

        // todo: add proper filedata type
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const response: PutObjectCommandOutput = await this.client.send(
            new PutObjectCommand(objectParams),
        );
        // console.log(response);

        return response;
    }

    async delete(filename: string): Promise<void> {
        const objectParams = {
            Bucket: config.get("s3.bucket"),
            Key: filename,
        };

        // todo: add proper filedata type
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.client.send(new DeleteObjectCommand(objectParams));
    }
    getObjectUri(filename: string): string {
        // https://catalog-service-project.s3.us-east-1.amazonaws.com/447fedde-9b5f-403c-bba5-df93d8514cb1
        const bucket = config.get("s3.bucket");
        const region = config.get("s3.region");

        if (typeof bucket === "string" && typeof region === "string") {
            return `https://${bucket}.s3.${region}.amazonaws.com/${filename}`;
        }
        const error = createHttpError(500, "Invalid S3 configuration");
        throw error;
    }
}
