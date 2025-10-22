import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CustomPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type === 'body') {
            value = {
                "id": 1,
                "name": "hehe",
            }
        } else if (metadata.type === 'param') {
            value = {
                "id": 2,
                "name": "hehe"
            }
        }

        return value;
    }
}