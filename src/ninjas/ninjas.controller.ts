// Controllers provide routes for the services
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) {}
    // GET /ninjas?type=fast --> []
    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') { // '@Query' decorator is use if we want to extract the Query Param (starts after putting '?') from the request/url
        // const service = new NinjasService(); // no need for this line, thanks to the constructor
        return this.ninjasService.getNinjas(weapon);
    }
    // GET /ninjas/:id --> { ... }
    @Get(':id')
    getOneNinja(@Param('id') id: string) {  // '@Param' decorator is use if we want to extract the param (starts after putting ':') from the request/url
        try {
            return this.ninjasService.getNinja(+id);    // the plus before 'id' is to typecast string to int
        } catch (error) {
            throw new NotFoundException('Ninja not found', {cause: error});
        }
    }
    // POST /ninjas
    @Post()
    @UseGuards(BeltGuard)   // Guard is used here, chech belt folder
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        return this.ninjasService.createNinja(createNinjaDto);
    }
    // PUT /ninjas/:id --> { ... }
    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        return this.ninjasService.updateNinja(+id, updateNinjaDto);
    }
    // DELETE /ninjas/:id
    @Delete(':id')
    deleteNinja(@Param('id', ParseIntPipe) id: number) {    // ParseInt pipe typecast to int automatically
        return this.ninjasService.removeNinja(id);
        }
}
