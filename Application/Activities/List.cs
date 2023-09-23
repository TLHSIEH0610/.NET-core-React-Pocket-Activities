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

            public PagingParams Params { get; set; }
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
                var query = _context.Activities.ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUserEmail = _userAccessor.GetUserEmail() })
                .AsQueryable();

                //execute query
                return Result<PageList<ActivityDto>>.Success(await PageList<ActivityDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }

    }
}