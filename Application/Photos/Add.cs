using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _dataContext;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext dataContext, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
                _dataContext = dataContext;

            }
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Email == _userAccessor.GetUserEmail());
                if (user == null) return null;
                //(1)save to cloudinary
                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);
                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };
                //set default as isMain if main photo not found
                if (!user.Photos.Any(p => p.IsMain)) photo.IsMain = true;
                //(2)save to DB
                user.Photos.Add(photo);
                var result = await _dataContext.SaveChangesAsync() > 0;
                if (result) return Result<Photo>.Success(photo);
                return Result<Photo>.Failure("Fail to upload photo");

            }
        }
    }
}