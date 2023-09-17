using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Core;
using API.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;

namespace Application.Activities
{
    public class List
    {

        public class Query : IRequest<Result<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            public readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities.ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUserEmail = _userAccessor.GetUserEmail() }).ToListAsync();
                //use ActivityDto instead of Activity to shape data and prevent infinite loop/object cycle error
                var shapedActivities = _mapper.Map<List<ActivityDto>>(activities);
                return Result<List<ActivityDto>>.Success(shapedActivities);
            }
        }

    }
}