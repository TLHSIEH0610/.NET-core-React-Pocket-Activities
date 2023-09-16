using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext dataContext, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _dataContext = dataContext;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Email == _userAccessor.GetUserEmail());

                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);
                if (photo == null) return null;
                //check if the photo is main
                if (photo.IsMain) return Result<Unit>.Failure("Please replace your main photo first!");
                //delete from cloudinary
                var photoDeleteResult = await _photoAccessor.DeletePhoto(photo.Id);
                if (photoDeleteResult == null) return Result<Unit>.Failure("Fail to delete photo from cloudinary");
                //delete from DB
                user.Photos.Remove(photo);
                var result = await _dataContext.SaveChangesAsync() > 0;
                if (result) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Fail to delete photo from DB");

            }
        }
    }
}