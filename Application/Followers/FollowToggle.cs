using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string TargetId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _dataContext = dataContext;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == _userAccessor.GetUserEmail());
                var target = await _dataContext.Users.FirstOrDefaultAsync(u => u.Id == request.TargetId);
                if (target == null) return null;
                var following = await _dataContext.UserFollowings.FindAsync(observer.Id, target.Id);
                if (following == null) //not found, follow
                {
                    following = new UserFollowing
                    {
                        Observer = observer,
                        Target = target
                    };

                    _dataContext.UserFollowings.Add(following);
                }
                else //found, unfollow
                {
                    _dataContext.UserFollowings.Remove(following);
                }

                var result = await _dataContext.SaveChangesAsync() > 0;
                if (result) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Fail to update following");

            }
        }
    }
}