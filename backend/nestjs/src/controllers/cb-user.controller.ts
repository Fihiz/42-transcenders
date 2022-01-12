import { Controller, Get, Post, Param, Response, Request, Body, Req, Res } from '@nestjs/common';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { UserService } from 'src/services/sb-user.service';

import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { AdminChangeUserRoleDto } from 'src/dtos/adminChangeUserRole.dto';
import { AdminChangeIsBannedDto } from 'src/dtos/adminChangeIsBanned.dto';
import { AddNewFriendDto } from 'src/dtos/addNewFriend.dto';
import { RelationEntity } from 'src/entities/eb-relation.entity';

import * as fs from 'fs';
import { DisplayProfileUpdate } from 'src/gateways/displayProfileUpdate.gateway';

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
    
    constructor(private userService: UserService,
        private displayProfileUpdate: DisplayProfileUpdate,) {}

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
    
    @Post('addNewFriend')
    async postAddNewFriend(@Body('data') dataDto: AddNewFriendDto) {
        try {
            const response = await this.userService.addNewFriend(dataDto)
        }
        catch {
            alert('An error has occured when adding a new friend');
        } 
    }

    // FOR FRIENDS
    @Get('getAllMyrelations/:login')
	async getAllMyrelations(@Param('login') login, @Response() res) {
        const relations: any[] = await this.userService.findAllrelationsOf(login);
        res.send(relations);
	}

    // @Get('checkIfAlreadyFriend')
	// async getCheckIfAlreadyFriend(@Request() req, @Response() res): Promise<any> {
    //     console.log('data', req.query);
	// 	const isAlreadyFriend: RelationEntity = await this.userService.findIfAlreadyFriend(req.query.currentLogin, req.query.newFriendLogin);
    //     if (isAlreadyFriend && isAlreadyFriend.friendship === "friend")
    //         res.send(true);
	// 	else
	// 	    res.send(false);
	// }

    // @Get('checkIfAlreadyFriend')
	// async getCheckIfAlreadyFriend(@Request() req, @Response() res): Promise<any> {
    //     console.log('data', req.query);
	// 	const isAlreadyFriend: RelationEntity = await this.userService.findIfAlreadyFriend(req.query.currentLogin, req.query.newFriendLogin);
    //     if (isAlreadyFriend && isAlreadyFriend.friendship === "friend")
    //         res.send(true);
	// 	else
	// 	    res.send(false);
	// }
  
	@Get('profile/:login')
	async getProfileByLogin(@Param('login') login: string, @Response() res, @Request() req): Promise<WebAppUserEntity> {
		const profile: WebAppUserEntity = await this.userService.findOneWebAppUser(login);
        // if (profile)
        //     profile.avatar = profile.avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
		res.send(profile);
		return profile;
	}

    @Get('pseudo/:pseudo')
    async isPseudoAvailable(@Param('pseudo') pseudo: string, @Response() res, @Request() req) {
        const result: boolean = await this.userService.findPseudo(pseudo, req.query.login);
        res.send(result);
    }

    @Post('profile/:login')
    async updateProfile(@Param('login') login: string, @Response() res, @Request() req, @Body('data') data) {
        const response = await this.userService.updateUser(login, data);
        if (response.affected === 1)
        {
            this.displayProfileUpdate.server.emit("profileUpdate", {login , pseudo: data.pseudo, avatar: data.avatar, bio: data.bio});
            res.send("Success");
        }
        else
            res.send("Failure");
    }

    // @Post('avatar/:login')
    @Post('avatar/upload/:file')
    @UseInterceptors(
    FileInterceptor('avatar', {
        storage:
        diskStorage({
            destination: 'src/assets/avatar/upload',
            filename: editFileName,
        }),
        fileFilter: checkFileExtension,
    }),
    )
    uploadAvatar(@UploadedFile() file, @Response() res) {
        console.log();
        const url = `http://localhost:3000/cb-user/avatar/upload/${file.filename}`;
        res.send(url);
        return url;
    }

    @Post('avatar/save/:login')
    saveAvatar(@Body('login') login: string) {
        const oldPath = `src/assets/avatar/upload/${login}.jpg`;
        const newPath = `src/assets/avatar/${login}.jpg`;
        fs.rename(oldPath, newPath, (error) => {
            if (error) {
                console.log('Uploaded file moove has failed...');
                throw error;
            }
            console.log('Uploaded file moove has succeded!');
        })
        this.userService.updateAvatar(login);
    }

    @Get('avatar/upload/:filename')
    getUploadedAvatar(@Param('filename') filename, @Response() res) {
        res.sendFile(filename, { root: './src/assets/avatar/upload' });
    }

    @Get('avatar/:filename')
    getSaveAvatar(@Param('filename') filename, @Response() res) {
        res.sendFile(filename, { root: './src/assets/avatar' });
    }

    @Get('isBanned')
    async isBanned(@Req() Req, @Res() res) {
        res.send(await this.userService.isTheUserBanned(Req.query[0]));
    }

}