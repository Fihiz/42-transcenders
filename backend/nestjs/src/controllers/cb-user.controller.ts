import { Controller, Get, Post, Param, Response, Request, Body } from '@nestjs/common';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { UserService } from 'src/services/sb-user.service';

import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { AdminChangeUserRoleDto } from 'src/dtos/adminChangeUserRole.dto';
import { AdminChangeIsBannedDto } from 'src/dtos/adminChangeIsBanned.dto';


const editFileName = (req, file, callback) => {
    const name = req.body.filename;
    // const extension = mime.extension(file.mimetype); // if we want handle several extention
    const extension = "jpg";
    callback(null, `${name}.${extension}`);
};

const checkFileExtension = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg)$/))
        return callback(new Error('Extension not allowed !'), false);
    callback(null, true);
};

@Controller('cb-user')
export class UserController {
    
    constructor(private userService: UserService) {}

    @Post('adminUpdateRole')
    async postAdminUpdateRole(@Body('data') dataDto:  AdminChangeUserRoleDto) {
        try {
            const response = await this.userService.adminChangeUserRole(dataDto)
        }
        catch {
            alert('An error has occured when changing the user role');
        } 
    }

    @Post('adminUpdateIsBanned')
    async postAdminUpdateIsBanned(@Body('data') dataDto: AdminChangeIsBannedDto) {
        try {
            const response = await this.userService.adminChangeIsBanned(dataDto)
        }
        catch {
            alert('An error has occured when banning the user');
        }
        
    }
  
	@Get('profile/:login')
	async getProfileByLogin(@Param('login') login: string, @Response() res, @Request() req): Promise<WebAppUserEntity> {
		const profile: WebAppUserEntity = await this.userService.findOneWebAppUser(login);
        if (profile)
            profile.avatar = profile.avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
		res.send(profile);
		return profile;
	}

    // will be used later to update our user

    // @Post('avatar/:login')
    @Post('avatar/:file')
    @UseInterceptors(
    FileInterceptor('avatar', {
        storage:
        diskStorage({
            destination: 'src/assets/avatar',
            filename: editFileName,
        }),
        fileFilter: checkFileExtension,
    }),
    )
    // uploadAvatar(@Param('login') login: string, @UploadedFile() file, @Response() res)
    uploadAvatar(@UploadedFile() file, @Response() res) {
        // TODO = If user exist alors on appel updateAvatar
        const url = `http://localhost:3000/cb-user/avatar/${file.filename}`;
        res.send(url);
        return url;
    }

    @Get('avatar/:filename')
    getUploadedAvatar(@Param('filename') filename, @Response() res) {
        res.sendFile(filename, { root: './src/assets/avatar' });
    }

}