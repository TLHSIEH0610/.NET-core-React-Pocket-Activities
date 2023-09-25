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

        public class Query : IRequest<Result<PageList<ActivityDto>>>
        {

            public ActivityParams Params { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PageList<ActivityDto>>>
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

            public async Task<Result<PageList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Activities.Where(d => d.Date >= request.Params.StartDate).OrderBy(d => d.Date).ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUserEmail = _userAccessor.GetUserEmail() })
                .AsQueryable();

                if (request.Params.ActivityFilter == "isGoing")
                {
                    query = query.Where(x => x.Attendees.Any(a => a.AppUserId == _userAccessor.GetUserId()));
                }

                if (request.Params.ActivityFilter == "isHost")
                {
                    query = query.Where(x => x.HostUserId == _userAccessor.GetUserId());
                }

                //execute query
                return Result<PageList<ActivityDto>>.Success(await PageList<ActivityDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }

    }
}