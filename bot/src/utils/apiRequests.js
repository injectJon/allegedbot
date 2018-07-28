import fetch from 'node-fetch';

// AllegedBot API Requests ------------------------------------------------

export const fetchGuilds = function fetchGuilds() {
  return new Promise( ( resolve, reject ) => {
    fetch(
      `${ process.env.API_PATH }/api/guilds`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${ process.env.ALLEGEDBOT_API_KEY }`,
        },
      }
    )
      .then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }
        resolve( body.guilds );
      } );
  } );
};

export const createGuild = function createGuild( guild ) {
  return new Promise( ( resolve, reject ) => {
    const body = {
      guildId: guild.id,
      admins: guild.owner.id,
    };

    fetch(
      `${ process.env.API_PATH }/api/guilds`,
      {
        method: 'POST',
        body: JSON.stringify( body ),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${ process.env.ALLEGEDBOT_API_KEY }`,
        },
      }
    ).then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body );
      } );

  } );
};

export const updateGuild = function updateGuild( guild ) {
  return new Promise( ( resolve, reject ) => {
    const body = {
      guild,
    };
    fetch(
      `${ process.env.API_PATH }/api/guilds/${ guild._id }`,
      {
        method: 'PUT',
        body: JSON.stringify( body ),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${ process.env.ALLEGEDBOT_API_KEY }`,
        },
      }
    ).then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body.updatedGuild );
      } );
  } );
}

export const fetchCommands = function fetchCommands( guild ) {
  return new Promise( ( resolve, reject ) => {

    const guild_id = guild._id;
    fetch(
      `${ process.env.API_PATH }/api/${ guild_id }/commands`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${ process.env.ALLEGEDBOT_API_KEY }`,
        },
      }
    )
      .then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body.commands );
      } );

  } );
};

export const deleteCommand = function deleteCommand( command_id ) {
  return new Promise( ( resolve, reject ) => {

    fetch(
      `${ process.env.API_PATH }/api/${ 1234 }/commands/${ command_id }`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${ process.env.ALLEGEDBOT_API_KEY }`,
        }
      }
    ).then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body );
      } )

  } );
};

export const createCommand = function createCommand( guild_Id, code, response, complex, tools ) {
  return new Promise( ( resolve, reject ) => {

    const body = {
      guildId: guild_Id,
      code,
      response,
      complex,
      tools
    };

    fetch(
      `${ process.env.API_PATH }/api/${ guild_Id }/commands`,
      {
        method: 'POST',
        body: JSON.stringify( body ),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${ process.env.ALLEGEDBOT_API_KEY }`,
        },
      }
    ).then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body.command );
      } );

  } );
};

export const updateCommand = function updateCommand( command ) {
  return new Promise( ( resolve, reject ) => {

    const body = {
      commandId: command._id,
      guildId: command.guildId,
      code: command.code,
      response: command.response,
      complex: command.complex,
      tools: command.tools,
    };

    fetch(
      `${ process.env.API_PATH }/api/1234/commands/${ body.commandId }`,
      {
        method: 'PUT',
        body: JSON.stringify( body ),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${ process.env.ALLEGEDBOT_API_KEY }`,
        },
      }
    ).then( res => res.json() )
      .then( body => {
        if ( !body.success ) {
          console.log( body );
          reject();
        }

        resolve( body );
      } );

  } );
};
