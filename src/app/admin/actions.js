'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'

// Helper to check admin status
async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    throw new Error('Not authorized')
  }

  return { supabase, user }
}

// Competition actions
export async function createCompetition(prevState, formData) {
  try {
    const { supabase, user } = await requireAdmin()

    const title = formData.get('title')?.toString().trim()
    const description = formData.get('description')?.toString().trim() || null
    const rules = formData.get('rules')?.toString().trim() || null
    const startsAt = formData.get('starts_at')?.toString()
    const endsAt = formData.get('ends_at')?.toString()
    const isActive = formData.get('is_active') === 'true'

    if (!title || !startsAt || !endsAt) {
      return { success: false, message: 'Title, start date, and end date are required' }
    }

    const { data, error } = await supabase
      .from('ctf_competitions')
      .insert({
        title,
        description,
        rules,
        starts_at: startsAt,
        ends_at: endsAt,
        is_active: isActive,
        created_by: user.id
      })
      .select('id')
      .single()

    if (error) {
      console.error('Create competition error:', error)
      return { success: false, message: 'Failed to create competition' }
    }

    revalidatePath('/admin/ctf/competitions')
    revalidatePath('/ctf')

    return { success: true, message: 'Competition created', id: data.id }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export async function updateCompetition(prevState, formData) {
  try {
    const { supabase } = await requireAdmin()

    const id = formData.get('id')?.toString()
    const title = formData.get('title')?.toString().trim()
    const description = formData.get('description')?.toString().trim() || null
    const rules = formData.get('rules')?.toString().trim() || null
    const startsAt = formData.get('starts_at')?.toString()
    const endsAt = formData.get('ends_at')?.toString()
    const isActive = formData.get('is_active') === 'true'

    if (!id || !title || !startsAt || !endsAt) {
      return { success: false, message: 'ID, title, start date, and end date are required' }
    }

    const { error } = await supabase
      .from('ctf_competitions')
      .update({
        title,
        description,
        rules,
        starts_at: startsAt,
        ends_at: endsAt,
        is_active: isActive,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) {
      console.error('Update competition error:', error)
      return { success: false, message: 'Failed to update competition' }
    }

    revalidatePath('/admin/ctf/competitions')
    revalidatePath('/ctf')

    return { success: true, message: 'Competition updated' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export async function deleteCompetition(id) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('ctf_competitions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete competition error:', error)
      return { success: false, message: 'Failed to delete competition' }
    }

    revalidatePath('/admin/ctf/competitions')
    revalidatePath('/ctf')

    return { success: true, message: 'Competition deleted' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Challenge actions
export async function createChallenge(prevState, formData) {
  try {
    const { supabase } = await requireAdmin()

    const competitionId = formData.get('competition_id')?.toString()
    const title = formData.get('title')?.toString().trim()
    const description = formData.get('description')?.toString().trim()
    const category = formData.get('category')?.toString().trim()
    const difficulty = formData.get('difficulty')?.toString()
    const points = parseInt(formData.get('points')?.toString() || '100', 10)
    const flag = formData.get('flag')?.toString().trim()
    const flagFormat = formData.get('flag_format')?.toString().trim() || null
    const caseSensitive = formData.get('case_sensitive') !== 'false'
    const hint1 = formData.get('hint_1')?.toString().trim() || null
    const hint1Cost = parseInt(formData.get('hint_1_cost')?.toString() || '0', 10)
    const hint2 = formData.get('hint_2')?.toString().trim() || null
    const hint2Cost = parseInt(formData.get('hint_2_cost')?.toString() || '0', 10)
    const hint3 = formData.get('hint_3')?.toString().trim() || null
    const hint3Cost = parseInt(formData.get('hint_3_cost')?.toString() || '0', 10)
    const attachmentUrl = formData.get('attachment_url')?.toString().trim() || null
    const challengeUrl = formData.get('challenge_url')?.toString().trim() || null
    const maxAttempts = formData.get('max_attempts')?.toString().trim()
    const isVisible = formData.get('is_visible') !== 'false'
    const sortOrder = parseInt(formData.get('sort_order')?.toString() || '0', 10)

    if (!competitionId || !title || !description || !category || !difficulty || !flag) {
      return { success: false, message: 'Required fields: competition, title, description, category, difficulty, flag' }
    }

    // Hash the flag using database function
    const { data: hashResult } = await supabase.rpc('hash_ctf_flag', {
      p_flag: flag,
      p_case_sensitive: caseSensitive
    })

    if (!hashResult) {
      return { success: false, message: 'Failed to hash flag' }
    }

    const { data, error } = await supabase
      .from('ctf_challenges')
      .insert({
        competition_id: competitionId,
        title,
        description,
        category,
        difficulty,
        points,
        flag_hash: hashResult,
        flag_format: flagFormat,
        case_sensitive: caseSensitive,
        hint_1: hint1,
        hint_1_cost: hint1Cost,
        hint_2: hint2,
        hint_2_cost: hint2Cost,
        hint_3: hint3,
        hint_3_cost: hint3Cost,
        attachment_url: attachmentUrl,
        challenge_url: challengeUrl,
        max_attempts: maxAttempts ? parseInt(maxAttempts, 10) : null,
        is_visible: isVisible,
        sort_order: sortOrder
      })
      .select('id')
      .single()

    if (error) {
      console.error('Create challenge error:', error)
      return { success: false, message: 'Failed to create challenge' }
    }

    revalidatePath(`/admin/ctf/competitions/${competitionId}/challenges`)
    revalidatePath('/ctf')

    return { success: true, message: 'Challenge created', id: data.id }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export async function updateChallenge(prevState, formData) {
  try {
    const { supabase } = await requireAdmin()

    const id = formData.get('id')?.toString()
    const competitionId = formData.get('competition_id')?.toString()
    const title = formData.get('title')?.toString().trim()
    const description = formData.get('description')?.toString().trim()
    const category = formData.get('category')?.toString().trim()
    const difficulty = formData.get('difficulty')?.toString()
    const points = parseInt(formData.get('points')?.toString() || '100', 10)
    const flag = formData.get('flag')?.toString().trim() // Optional - only update if provided
    const flagFormat = formData.get('flag_format')?.toString().trim() || null
    const caseSensitive = formData.get('case_sensitive') !== 'false'
    const hint1 = formData.get('hint_1')?.toString().trim() || null
    const hint1Cost = parseInt(formData.get('hint_1_cost')?.toString() || '0', 10)
    const hint2 = formData.get('hint_2')?.toString().trim() || null
    const hint2Cost = parseInt(formData.get('hint_2_cost')?.toString() || '0', 10)
    const hint3 = formData.get('hint_3')?.toString().trim() || null
    const hint3Cost = parseInt(formData.get('hint_3_cost')?.toString() || '0', 10)
    const attachmentUrl = formData.get('attachment_url')?.toString().trim() || null
    const challengeUrl = formData.get('challenge_url')?.toString().trim() || null
    const maxAttempts = formData.get('max_attempts')?.toString().trim()
    const isVisible = formData.get('is_visible') !== 'false'
    const sortOrder = parseInt(formData.get('sort_order')?.toString() || '0', 10)

    if (!id || !title || !description || !category || !difficulty) {
      return { success: false, message: 'Required fields: id, title, description, category, difficulty' }
    }

    const updateData = {
      title,
      description,
      category,
      difficulty,
      points,
      flag_format: flagFormat,
      case_sensitive: caseSensitive,
      hint_1: hint1,
      hint_1_cost: hint1Cost,
      hint_2: hint2,
      hint_2_cost: hint2Cost,
      hint_3: hint3,
      hint_3_cost: hint3Cost,
      attachment_url: attachmentUrl,
      challenge_url: challengeUrl,
      max_attempts: maxAttempts ? parseInt(maxAttempts, 10) : null,
      is_visible: isVisible,
      sort_order: sortOrder,
      updated_at: new Date().toISOString()
    }

    // Only update flag hash if a new flag is provided
    if (flag) {
      const { data: hashResult } = await supabase.rpc('hash_ctf_flag', {
        p_flag: flag,
        p_case_sensitive: caseSensitive
      })

      if (hashResult) {
        updateData.flag_hash = hashResult
      }
    }

    const { error } = await supabase
      .from('ctf_challenges')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Update challenge error:', error)
      return { success: false, message: 'Failed to update challenge' }
    }

    revalidatePath(`/admin/ctf/competitions/${competitionId}/challenges`)
    revalidatePath('/ctf')

    return { success: true, message: 'Challenge updated' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export async function deleteChallenge(id, competitionId) {
  try {
    const { supabase } = await requireAdmin()

    const { error } = await supabase
      .from('ctf_challenges')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete challenge error:', error)
      return { success: false, message: 'Failed to delete challenge' }
    }

    revalidatePath(`/admin/ctf/competitions/${competitionId}/challenges`)
    revalidatePath('/ctf')

    return { success: true, message: 'Challenge deleted' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}
