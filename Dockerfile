FROM mcr.microsoft.comdotnetaspnet8.0 AS base
WORKDIR app
EXPOSE 8080

FROM mcr.microsoft.comdotnetsdk8.0 AS build
WORKDIR src
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o apppublish

FROM base AS final
WORKDIR app
COPY --from=build apppublish .
ENTRYPOINT [dotnet, RotaryClubUrucui.dll]