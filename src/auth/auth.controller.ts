import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './authDto';
import { IsEnum } from 'class-validator';
import { PhoneAuth } from './customPipe/phoneAuth';
import { CustomPipe } from './customPipe/customPipe';

@Controller('auth')
export class AuthController {
    @Post('register')
    @UsePipes(ValidationPipe, PhoneAuth, CustomPipe)
    registerUser(@Body() userData: AuthDto) {
        return {
            data: userData,
        }
    }
}
