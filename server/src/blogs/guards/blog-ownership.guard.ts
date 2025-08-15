import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BlogsService } from 'src/blogs/blogs.service';
import { UserRole } from '../../common/enums/user-role.enum';
@Injectable()
export class BlogsOwnerShip implements CanActivate {
  constructor(private readonly blogsService: BlogsService) {}
  async canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const user = req.user;
    const id = req.params.id;
    const doc = await this.blogsService.findById(id);
    if (user.role === UserRole.ADMIN) {
      return true;
    }
    if (!doc) {
      throw new NotFoundException('Blog not found');
    }
    const authorId = doc.authorId._id;
    if (user.userId.toString() === authorId.toString()) return true;
    throw new ForbiddenException('You do not own this blog');
  }
}
