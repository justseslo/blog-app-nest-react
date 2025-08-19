import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CommentsService } from '../comments.service';
@Injectable()
export class CommentOwnershipGuard implements CanActivate {
  constructor(private readonly commentsService: CommentsService) {}
  canActivate(context: ExecutionContext) {
    return true;
  }
}
